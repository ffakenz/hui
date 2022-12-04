import { Idle, State, Host, UTCTime, DialogState, FeedbackState, Pending, Connected, HeadStateType, HeadState, Initializing, Severity, UserFeedback, UTxO, Party } from "./model/types"
import { Committed, Greetings, PeerConnected, PeerDisconnected, ReadyToCommit, ServerOutput } from './ws/hydra-events'
import { Options } from "./options"

const handleAppEvent: (state: State, output: ServerOutput) => State =
    (state: State, output: ServerOutput) => {
        console.log("[handleAppEvent]=,", state)
        switch (output.tag) {
            case "Greetings": {
                const greetings = (output as Greetings)
                return {
                    ...state,
                    me: greetings.me,
                    peers: []
                }
            }
            case "PeerConnected": {
                const peerConnected = (output as PeerConnected)
                const peer = peerConnected.peer
                const connected = state as Connected
                const peers = connected.peers
                const set = new Set(peers.concat([peer]))
                return {
                    ...state,
                    peers: Array.from(set.values())
                }
            }
            case "PeerDisconnected": {
                const peerDisconnected = (output as PeerDisconnected)
                const peer = peerDisconnected.peer
                const connected = state as Connected
                const peers = connected.peers
                return {
                    ...state,
                    peers: peers.filter(p => p.nodeId !== peer.nodeId)
                }
            }
            case "ReadyToCommit": {
                const readyToCommit = (output as ReadyToCommit)
                const ps = readyToCommit.parties
                const initializing: HeadState = {
                    tag: HeadStateType.Initializing,
                    parties: ps,
                    remainingParties: ps,
                    utxo: {}
                } as Initializing
                const feedback = {
                    severity: Severity.Info,
                    message: "Head initialized, ready for commit(s).",
                    time: {
                        time: Date.now()
                    }
                } as UserFeedback
                const connected = state as Connected
                return {
                    ...state,
                    headState: initializing,
                    pending: Pending.NotPending,
                    feedback: [feedback].concat(connected.feedback)
                }
            }
            case "Committed": {
                const commited = output as Committed
                const partyCommitted: (party: Party, utxo: UTxO, curr: HeadState) => (HeadState) =
                    (party, utxo, curr) => {
                        if ((curr as Initializing).tag) {
                            const initializing = (curr as Initializing)
                            return {
                                ...initializing,
                                remainingParties: initializing.remainingParties.filter(p => p.vkey !== party.vkey),
                                utxo: {
                                    ...utxo,
                                    utxo
                                } as UTxO
                            } as Initializing
                        }
                        else {
                            return curr
                        }
                    }
                const party = commited.party
                const utxo = commited.utxo
                const connected = state as Connected

                const balance: (utxo: UTxO) => number = utxo => {
                    const lovelaces = Object.keys(utxo).map((key: string) => {
                        type ObjectKey = keyof typeof utxo;
                        const utxoType = utxo[(key as ObjectKey)]
                        return (utxoType["value"]["lovelace"] as number)
                    });
                    const total = lovelaces.reduce((acc, lovelace) => acc + lovelace)
                    return total
                }

                const feedback = {
                    severity: Severity.Info,
                    message: `
                        ${party.toString()} committed ${balance(utxo)} lovelace
                    `,
                    time: {
                        time: Date.now()
                    }
                } as UserFeedback

                const pending =
                    connected.me && connected.me.vkey === party.vkey ?
                        Pending.NotPending : connected.pending

                return {
                    ...state,
                    headState: partyCommitted(party, utxo, connected.headState),
                    feedback: [feedback].concat(connected.feedback),
                    pending: pending
                }
            }
            case "HeadIsAborted": {
                const feedback = {
                    severity: Severity.Info,
                    message: "Head aborted, back to square one.",
                    time: {
                        time: Date.now()
                    }
                } as UserFeedback

                const connected = state as Connected

                return {
                    ...state,
                    headState: { tag: HeadStateType.Idle } as Idle,
                    feedback: [feedback].concat(connected.feedback),
                    pending: Pending.NotPending
                }
            }
            case "RolledBack":
                return { ...state }
            default:
                return { ...state }
        }
    }

const disconnected: (options: Options) => State = (options) => {
    return {
        nodeHost: {
            hostname: options.hydraNodeHost.hostname,
            port: options.hydraNodeHost.port
        } as Host,
        now: { time: Date.now() } as UTCTime
    }
}

const connected: (options: Options) => State = (options) => {
    return {
        me: undefined,
        nodeHost: {
            hostname: options.hydraNodeHost.hostname,
            port: options.hydraNodeHost.port
        } as Host,
        peers: [],
        headState: { tag: HeadStateType.Idle } as Idle,
        dialogState: DialogState.NoDialog,
        feedbackState: FeedbackState.Short,
        feedback: [],
        now: { time: Date.now() } as UTCTime,
        pending: Pending.Pending
    }
}

export interface Transitions {
    handleAppEvent: (state: State, output: ServerOutput) => State
    disconnected: (options: Options) => State
    connected: (options: Options) => State
}

export const transitions: Transitions = {
    handleAppEvent,
    disconnected,
    connected
}
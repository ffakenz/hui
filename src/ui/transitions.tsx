import { Idle, State, Host, UTCTime, DialogState, FeedbackState, Pending, Connected, HeadStateType } from "./model/types"
import { Greetings, PeerConnected, PeerDisconnected, ServerOutput } from './ws/hydra-events'
import { Options } from "./options"

const handleAppEvent: (state: State, output: ServerOutput) => State =
    (state: State, output: ServerOutput) => {
        console.log("PEPE=,", state)
        switch (output.tag) {
            case "Greetings": {
                return {
                    ...state,
                    me: (output as Greetings).me,
                    peers: []
                }
            }
            case "PeerConnected": {
                const peers = (state as Connected).peers
                const peer = (output as PeerConnected).peer
                const set = new Set(peers.concat([peer]))
                return {
                    ...state,
                    peers: Array.from(set.values())
                }
            }
            case "PeerDisconnected": {
                const peers = (state as Connected).peers
                const peer = (output as PeerDisconnected).peer
                return {
                    ...state,
                    peers: peers.filter(p => p.nodeId != peer.nodeId)
                }
            }
            case "ReadyToCommit":
                return {
                    ...state
                }
            case "Committed":
                return { ...state }
            case "HeadIsAborted":
                return { ...state }
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
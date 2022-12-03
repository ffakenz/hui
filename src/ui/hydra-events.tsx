import { NodeId, Party, UTCTime, UTxO } from "./state"

export interface Greetings {
    tag: string;
    me: Party;
    // seq: number;
    // timestamp: Date
}

export interface PeerConnected {
    tag: string;
    peer: NodeId;
    // seq: number;
    // timestamp: Date
}

export interface PeerDisconnected {
    tag: string;
    peer: NodeId;
    // seq: number;
    // timestamp: Date
}

export interface ReadyToCommit {
    tag: string;
    parties: Party[];
    // seq: number;
    // timestamp: Date
}

export interface Committed {
    tag: string;
    party: Party;
    utxo: UTxO
    // seq: number;
    // timestamp: Date
}

export interface HeadIsAborted {
    tag: string;
    utxo: UTxO
    // seq: number;
    // timestamp: Date
}

export interface RolledBack {
    tag: string;
    // seq: number;
    // timestamp: Date
}

export type ServerOutput =
    Greetings
    | PeerConnected
    | PeerDisconnected
    | ReadyToCommit
    | Committed
    | HeadIsAborted
    | RolledBack

export interface ClientConnected { tag: "ClientConnected " }

export interface ClientDisconnected { tag: "ClientDisconnected " }

export interface Update { tag: "Update ", output: ServerOutput }

export interface Tick { tag: "Tick ", tick: UTCTime }

export type HydraEvent =
    ClientConnected
    | ClientDisconnected
    | Update
    | Tick
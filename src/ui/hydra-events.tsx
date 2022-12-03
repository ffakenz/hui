import { NodeId, Party, UTCTime } from "./state"

export interface Greetings {
    tag: string;
    me: Party;
    seq: number;
    timestamp: Date
}

export interface PeerConnected {
    tag: string;
    peer: NodeId;
    seq: number;
    timestamp: Date
}

export interface PeerDisconnected {
    tag: string;
    peer: NodeId;
    seq: number;
    timestamp: Date
}

export type ServerOutput =
    Greetings
    | PeerConnected
    | PeerDisconnected

export interface Update {
    output: ServerOutput
}

export interface Tick {
    value: UTCTime
}

export type HydraEvent =
    "ClientConnected"
    | "ClientDisconnected"
    | Update
    | Tick
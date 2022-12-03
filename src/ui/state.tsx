export interface Host { hostname: string; port: number }

export interface Party { vkey: string }

export interface NodeId { nodeId: string }

export interface UTCTime { time: number }

export interface UTxO {
    toMap: object // FIXME ~> Map TxIn out
}

export type DialogState = "NoDialog" | "Dialog"

export type Pending = "Pending" | "NotPending"

export type FeedbackState = "Short" | "Full"

export type Severity = "Success" | "Info" | "Error"

export interface UserFeedback {
    severity: Severity;
    message: string;
    time: UTCTime
}

export interface Initializing { parties: [Party]; remainingParties: [Party]; utxo: UTxO }

export interface Open { parties: [Party]; utxo: UTxO }

export interface Closed { contestationDeadline: UTCTime }

export interface Final { utxo: UTxO }

export type HeadState =
    "Idle"
    | Initializing
    | Open
    | Closed
    | "FanoutPossible"
    | Final

export interface Disconnected { nodeHost: Host; now: UTCTime }

export interface Connected {
    me?: Party;
    nodeHost: Host;
    index: [NodeId];
    headState: HeadState;
    dialogState: DialogState;
    feedbackState: FeedbackState;
    feedback: [UserFeedback];
    now: UTCTime;
    pending: Pending;
}

export type State = Disconnected | Connected
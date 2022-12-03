interface Host { hostname: string; port: number }

interface Party { vkey: string }

interface NodeId { nodeId: string }

interface UTCTime { time: Date }

interface UTxO {
    toMap: object // FIXME ~> Map TxIn out
}

type DialogState = "NoDialog" | "Dialog"

type Pending = "Pending" | "NotPending"

type FeedbackState = "Short" | "Full"

type Severity = "Success" | "Info" | "Error"

interface UserFeedback {
    severity: Severity;
    message: string;
    time: UTCTime
}

interface Initializing { parties: [Party]; remainingParties: [Party]; utxo: UTxO }

interface Open { parties: [Party]; utxo: UTxO }

interface Closed { contestationDeadline: UTCTime }

interface Final { utxo: UTxO }

type HeadState =
    "Idle"
    | Initializing
    | Open
    | Closed
    | "FanoutPossible"
    | Final

interface Disconnected { nodeHost: Host; now: UTCTime }

interface Connected {
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

type State = Disconnected | Connected
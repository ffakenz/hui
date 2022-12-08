import { useContext, useEffect, useState } from "react"
import { ClientConnected, ClientDisconnected, HydraEvent, HydraEventType, ServerOutput, Update } from "./events"
import { HydraSocketContext } from "./context"

export const onHydraEvent = (emitEvent: (evt: HydraEvent) => void) => {
    // get the socket instance
    const { socket } = useContext(HydraSocketContext)
    const [event, setEvent] = useState<HydraEvent | null>(null)

    // when the component, *which uses this hook* mounts, add listeners.
    useEffect(() => {
        socket.on('open', () => {
            // console.log('[HydraEvent] connected')
            setEvent({ tag: HydraEventType.ClientConnected } as ClientConnected)
        })

        socket.on('close', () => {
            // console.log('[HydraEvent] disconnected')
            setEvent({ tag: HydraEventType.ClientDisconnected } as ClientDisconnected)
        })

        socket.on("message", (e: Buffer) => {
            const data = e.toString('utf8')
            // console.log("[HydraEvent][ServerOutput]", data)
            const output = JSON.parse(data) as ServerOutput
            setEvent({ tag: HydraEventType.Update, output } as Update)
        })

        // remove all the listeners and close the socket when it unmounts
        return () => {
            if (socket) {
                socket.close()
            }
        }
    }, [])

    useEffect(() => {
        event && emitEvent(event)
    }, [event])
}
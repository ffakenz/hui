import { useContext, useEffect, useState } from "react"
import { ClientConnected, ClientDisconnected, HydraEvent, HydraEventType, ServerOutput, Update } from "./events"
import { HydraSocketContext } from "./context"

export const onHydraEvent = (emitEvent: (evt: HydraEvent) => void) => {
    // get the socket instance
    const { socket } = useContext(HydraSocketContext)
    const [event, setEvent] = useState<HydraEvent | null>(null)

    // when the provider mounts, initialize it and register a few listeners
    useEffect(() => {
        socket.on('open', () => {
            // console.log('connected')
            setEvent({ tag: HydraEventType.ClientConnected } as ClientConnected)
        })

        socket.on('close', () => {
            // console.log('disconnected')
            setEvent({ tag: HydraEventType.ClientDisconnected } as ClientDisconnected)
        })

        // Remove all the listeners and close the socket when it unmounts
        return () => {
            if (socket) {
                socket.removeAllListeners()
                socket.close()
            }
        }
    }, [])

    // when the component, *which uses this hook* mounts, add a listener.
    useEffect(() => {
        socket.on("message", (e: Buffer) => {
            const data = e.toString('utf8')
            // console.log("[ServerOutput]", data)
            const output = JSON.parse(data) as ServerOutput
            setEvent({ tag: HydraEventType.Update, output } as Update)
        })
    }, [])


    // setup effect to execute callback on every `event` change
    useEffect(() => {
        event && emitEvent(event)
    }, [event])
}
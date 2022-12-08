import { useContext, useEffect } from "react"
import { ClientConnected, ClientDisconnected, HydraEvent, HydraEventType, ServerOutput, Update } from "./events"
import { HydraSocketContext } from "./context"

export const onHydraEvent = (emitEvent: (evt: HydraEvent) => void) => {
    // get the socket instance
    const { socket } = useContext(HydraSocketContext)

    // when the provider mounts, initialize it and register a few listeners
    useEffect(() => {
        socket.on('open', () => {
            // console.log('connected')
            emitEvent({ tag: HydraEventType.ClientConnected } as ClientConnected)
        })

        socket.on('close', () => {
            // console.log('disconnected')
            emitEvent({ tag: HydraEventType.ClientDisconnected } as ClientDisconnected)
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
            emitEvent({ tag: HydraEventType.Update, output } as Update)
        })
        // sometimes the handler function gets redefined
        // when the component using this hook updates (or rerenders)
        // So adding a dependency makes sure the handler is
        // up to date!
    }, [emitEvent])
}
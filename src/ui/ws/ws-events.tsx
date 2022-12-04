import { HydraEvent, ClientConnected, ClientDisconnected, ServerOutput, Update, HydraEventType } from './hydra-events'
import WebSocket from 'ws'

export const wsEvents: (ws: WebSocket, emitEvent: (evt: HydraEvent) => void) => void =
    (ws, emitEvent) => {
        ws.on('open', () => {
            // console.log('connected')
            emitEvent({ tag: HydraEventType.ClientConnected } as ClientConnected)
        })

        ws.on('close', () => {
            // console.log('disconnected')
            emitEvent({ tag: HydraEventType.ClientDisconnected } as ClientDisconnected)
        })

        ws.on("message", (e: Buffer) => {
            const data = e.toString('utf8')
            // console.log("[ServerOutput]", data)
            const output = JSON.parse(data) as ServerOutput
            emitEvent({ tag: HydraEventType.Update, output } as Update)
        })
    }
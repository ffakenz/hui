/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import WebSocket from 'ws'
import { ClientConnected, ClientDisconnected, HydraEvent, HydraEventType, ServerOutput, Update } from '../events'
import { Observable } from 'rxjs'
import * as Rx from 'rxjs'
import { map } from 'rxjs/operators'

export class SocketService {
    private socket: WebSocket = {} as WebSocket

    public init(url: string): SocketService {
        // console.log('initiating socket service')
        this.socket = new WebSocket(url)
        return this
    }

    // link message event to rxjs data source
    public onMessage(): Observable<HydraEvent> {
        const openObservable: Observable<HydraEvent> =
            Rx.fromEvent(this.socket, "open").pipe(
                map(() => {
                    // console.log("connected")
                    return ({ tag: HydraEventType.ClientConnected } as ClientConnected)
                })
            )

        const closeObservable: Observable<HydraEvent> =
            Rx.fromEvent(this.socket, "close").pipe(
                map(() => {
                    // console.log("disconnected")
                    return ({ tag: HydraEventType.ClientDisconnected } as ClientDisconnected)
                })
            )

        const messageObservable: Observable<HydraEvent> =
            Rx.fromEvent(this.socket, "message").pipe(
                map((e) => {
                    const event = e as MessageEvent<ServerOutput>
                    // console.log("[ServerOutput]", event.data)
                    const output = event.data
                    return ({ tag: HydraEventType.Update, output } as Update)
                })
            )
        const observables: Observable<HydraEvent>[] = [openObservable, closeObservable, messageObservable]
        const observable: Observable<HydraEvent> = Rx.merge(...observables)
        return observable
    }

    // disconnect - used when unmounting
    public disconnect(): void {
        this.socket.close()
    }
}
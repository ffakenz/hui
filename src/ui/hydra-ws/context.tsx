
import React from 'react'
import WebSocket from 'ws'

export interface HydraSocketService {
    socket: WebSocket
}

export const HydraSocketContext: React.Context<HydraSocketService> =
    React.createContext({} as HydraSocketService)

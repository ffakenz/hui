// SocketProvider.jsx

import React, { useRef } from "react"
import WebSocket from 'ws'
import { options } from '../options'
import { HydraSocketContext } from './context'

const HydraSocketProvider: React.FC = ({ children }) => {
    const url = `ws://${options.hydraNodeHost.hostname}:${options.hydraNodeHost.port}`

    // we use a ref to store the socket as it won't be updated frequently
    const socket = useRef(new WebSocket(url))

    return (
        <HydraSocketContext.Provider value={{ socket: socket.current }}>
            {children}
        </HydraSocketContext.Provider>
    )
}

export default HydraSocketProvider
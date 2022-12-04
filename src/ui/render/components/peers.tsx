import { Text, Newline } from 'ink'
import React, { FC } from "react"
import { State } from "../../model/types"

export const peers: FC<{ state?: State }> = ({ state }) => {
    return (
        <Text>
            Hydra TUI 0.9.0 <Text color="green">
                connected to {state?.nodeHost.hostname}:{state?.nodeHost.port}
            </Text>
            <Newline />
            Connected peers:
            <Newline />
            - 172.16.238.30:5001
            <Newline />
            - 172.16.238.10:5001
        </Text>
    )
}
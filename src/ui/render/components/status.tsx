import { Text } from 'ink'
import React, { FC } from "react"
import { State, Connected } from "../../model/types"

export const status: FC<{ state?: State }> = ({ state }) => {
    if ((state as Connected).headState) {
        return (
            <Text>Head Status: <Text color="blue">{(state as Connected).headState.tag}</Text></Text>
        )
    } else {
        return (
            <Text> Head Status: <Text color="red">Disconnected</Text></Text>
        )
    }

}

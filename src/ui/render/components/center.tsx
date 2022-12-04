import { Text, Newline } from 'ink'
import React, { FC } from "react"
import { State, Connected } from "../../model/types"

export const center: FC<{ state?: State }> = ({ state }) => {
    if ((state as Connected).headState) {
        return (
            <Text>
                Total commited: 0.00000 A and -1 asset(s)
                <Newline />
                Waiting for parties to commit:
                <Newline />
                - <Text color="yellow">00000000000033</Text>
                <Newline />
                - 00000000000042
                <Newline />
                - 0000000000002a
            </Text>
        )
    } else {
        return (<Text></Text>)
    }
}

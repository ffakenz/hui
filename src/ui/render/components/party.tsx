import { Text, Newline } from 'ink'
import React, { FC } from "react"
import { State } from "../../model/types"

export const party: FC<{ state?: State }> = () => {
    return (
        <Text>
            Party <Text color="yellow">00000000000033</Text>
            <Newline />
            Address <Text color="yellow">addr_test1vqeuiqwjdas</Text>
            <Newline />
            Head participants:
            <Newline />
            - <Text color="yellow">00000000000033</Text>
            <Newline />
            - 00000000000042
            <Newline />
            - 0000000000002a
        </Text>
    )
}
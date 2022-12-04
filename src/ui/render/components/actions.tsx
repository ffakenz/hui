import { Text, Newline } from 'ink'
import React, { FC } from "react"
import { State } from "../../model/types"

export const actions: FC<{ state?: State }> = () => {
    return (
        <Text>
            [C]ommit
            <Newline />
            [A]bort
            <Newline />
            [Q]uit
        </Text>
    )
}

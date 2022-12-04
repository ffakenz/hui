import { Text } from 'ink'
import React, { FC } from "react"
import { State } from "../../model/types"

export const feedback: FC<{ state?: State }> = () => {
    return (
        <Text><Text color="blue">Feedback logs</Text></Text>
    )
}
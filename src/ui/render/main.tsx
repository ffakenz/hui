import { Box } from 'ink'
import React, { FC } from "react"
import { State } from "../model/types"
import { actions } from './components/actions'
import { center } from './components/center'
import { status } from './components/status'
import { feedback } from './components/feedback'
import { party } from './components/party'
import { peers } from './components/peers'

const leftPanel: FC<{ state?: State }> = ({ state }) => (
    <Box flexDirection="column" width="38%">
        <Box borderStyle="single" >
            {peers({ state })}
        </Box>
        <Box borderStyle="single" >
            {party({ state })}
        </Box>
    </Box>
)

const centerPanel: FC<{ state?: State }> = ({ state }) =>
    <Box flexDirection="column" width="54%">
        <Box borderStyle="single" height="20%">
            {status({ state })}
        </Box>
        <Box borderStyle="single" height="80%">
            {center({ state })}
        </Box>
    </Box>

const rightPanel: FC<{ state?: State }> = ({ state }) =>
    <Box borderStyle="single" flexDirection="column" width="8%">
        {actions({ state })}
    </Box>

const bottomPanel: FC<{ state?: State }> = ({ state }) =>
    <Box>
        {feedback({ state })}
    </Box>

const Render: FC<{ state?: State }> = ({ state }) =>
    <Box borderStyle="single" flexDirection="column" >
        <Box flexDirection="row">
            {leftPanel({ state })}
            {centerPanel({ state })}
            {rightPanel({ state })}
        </Box>
        <Box borderStyle="single" flexDirection="row">
            {bottomPanel({ state })}
        </Box>
    </Box>

export default Render
import { Box } from 'ink'
import React, { FC } from "react"
import Render from "./render"
import { State } from "./state"

const App: FC<{ state: State }> = ({ state }) => (
  <Box borderStyle="single" flexDirection="column" >
    <Box flexDirection="row">
      {Render.leftPanel({ state })}
      {Render.centerPanel({ state })}
      {Render.rightPanel({ state })}
    </Box>
    <Box borderStyle="single" flexDirection="row">
      {Render.bottomPanel({ state })}
    </Box>
  </Box>
)

export default App

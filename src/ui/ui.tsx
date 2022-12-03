import { Box } from 'ink'
import React, { FC } from "react"
import Render from "./render"

const App: FC<{ state?: string }> = ({ state = "Initializing" }) => (
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

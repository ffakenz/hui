import { Box } from 'ink'
import React, { FC } from "react"
import Render from "./render"

const App: FC<{ state?: string }> = ({ state = "Initializing" }) => (
  <Box borderStyle="single" flexDirection="column" >
    <Box flexDirection="row">
      {Render.renderLeftPanel({ state })}
      {Render.renderCenterPanel({ state })}
      {Render.renderRightPanel({ state })}
    </Box>
    {/* BOTTOM PANEL */}
    <Box borderStyle="single" flexDirection="row">
      {Render.renderBottomPanel({ state })}
    </Box>
  </Box>
)

export default App

import { Box } from 'ink'
import React, { FC, useState } from "react"
import Render from "./render"
import { Options } from "./options"
import { State, Host, UTCTime } from "./state"

const App: FC<{ options: Options }> = ({ options }) => {
  const disconnected: State = {
    nodeHost: {
      hostname: options.hydraNodeHost.hostname,
      port: options.hydraNodeHost.port
    } as Host,
    now: { time: Date.now() } as UTCTime
  }

  const [state, _] = useState(disconnected)

  /*
  TODO useEffect over state to handle:
    - ws inputs
    - user inputs
  */

  return (
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
}

export default App

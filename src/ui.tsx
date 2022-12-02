import { Box, Newline, Text } from 'ink';
import React, { FC } from "react"

const App: FC<{ state?: string }> = ({ state = "Initializing" }) => (
  <Box borderStyle="single" flexDirection="column">
    <Box flexDirection="row">
      {/* LEFT PANEL */}
      <Box flexDirection="column" width="38%">
        <Box borderStyle="single" >
          <Text>
            Hydra TUI 0.9.0 <Text color="green">connected to 172.16.238.20:4001</Text>
            <Newline />
            Connected peers:
            <Newline />
            - 172.16.238.30:5001
            <Newline />
            - 172.16.238.10:5001
          </Text>
        </Box>
        <Box borderStyle="single" >
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
        </Box>
      </Box>
      {/* CENTER PANEL */}
      <Box flexDirection="column" width="54%">
        <Box borderStyle="single" height="20%">
          <Text>Head Status: <Text color="blue">{state}</Text></Text>
        </Box>
        <Box borderStyle="single" height="80%">
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
        </Box>
      </Box>
      {/* RIGHT PANEL */}
      <Box borderStyle="single" flexDirection="column" width="8%">
        <Text>
          [C]ommit
          <Newline />
          [A]bort
          <Newline />
          [Q]uit
        </Text>
      </Box>
    </Box>
    {/* BOTTOM PANEL */}
    <Box borderStyle="single" flexDirection="row">
      <Text><Text color="blue">Feedback logs</Text></Text>
    </Box>
  </Box>
)

export default App

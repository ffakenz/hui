import { Box } from 'ink'
import React, { FC, useState } from "react"
import Render from "./render"
import { Options } from "./options"
import { Idle, State, Host, UTCTime, DialogState, FeedbackState, Pending, Connected } from "./state"
import { Greetings, PeerConnected, PeerDisconnected, ServerOutput } from './hydra-events'
import WebSocket from 'ws'

const disconnected: (options: Options) => State = (options) => {
  return {
    nodeHost: {
      hostname: options.hydraNodeHost.hostname,
      port: options.hydraNodeHost.port
    } as Host,
    now: { time: Date.now() } as UTCTime
  }
}

const connected: (options: Options) => State = (options) => {
  return {
    me: null,
    nodeHost: {
      hostname: options.hydraNodeHost.hostname,
      port: options.hydraNodeHost.port
    } as Host,
    peers: [],
    headState: { tag: "Idle" } as Idle,
    dialogState: DialogState.NoDialog,
    feedbackState: FeedbackState.Short,
    feedback: [],
    now: { time: Date.now() } as UTCTime,
    pending: Pending.Pending
  }
}

const App: FC<{ options: Options, ws: WebSocket }> = ({ options, ws }) => {

  const [state, setState] = useState(disconnected(options))

  ws.on('open', function open() {
    console.log('connected')
    setState(connected(options))
  })

  ws.on('close', function close() {
    console.log('disconnected')
    setState(disconnected(options))
  })

  ws.on("message", (e: Buffer) => {
    const data = e.toString('utf8')
    console.log("[ServerOutput]", data)
    const output = JSON.parse(data) as ServerOutput
    switch (output.tag) {
      case "Greetings": {
        setState({
          ...state,
          me: (output as Greetings).me,
          peers: []
        })
        break
      }
      case "PeerConnected": {
        const peers = (state as Connected).peers
        const peer = (output as PeerConnected).peer
        const set = new Set(peers.concat([peer]))
        setState({
          ...state,
          peers: Array.from(set.values())
        })
        break
      }
      case "PeerDisconnected": {
        const peers = (state as Connected).peers
        const peer = (output as PeerDisconnected).peer
        setState({
          ...state,
          peers: peers.filter(p => p.nodeId != peer.nodeId)
        })
        break
      }
      case "ReadyToCommit":
        break
      case "Committed":
        break
      case "HeadIsAborted":
        break
      case "RolledBack":
        break
      default:
        console.log("[ServerOutput] Irrelevant message", data)
    }
  })

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

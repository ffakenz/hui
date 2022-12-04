import { FC, useEffect, useState, useCallback, useRef } from "react"
import Render from "./render/main"
import { Options } from "./options"
import { HydraEvent, HydraEventType } from './ws/hydra-events'
import WebSocket from 'ws'
import { transitions } from './transitions'
import { wsEvents } from './ws/ws-events'

const App: FC<{ options: Options }> = ({ options }) => {
  const [state, setState] = useState(transitions.disconnected(options))

  const [event, setEvent] = useState<HydraEvent | null>(null)
  const ws = useRef<WebSocket | null>(null)

  useEffect(() => {
    ws.current = new WebSocket(`ws://${options.hydraNodeHost.hostname}:${options.hydraNodeHost.port}`)
    wsEvents(ws.current, setEvent)
    const wsCurrent = ws.current
    return () => {
      wsCurrent.close()
    }
  }, [])

  const callback = useCallback((event: HydraEvent) => {
    switch (event.tag) {
      case HydraEventType.ClientConnected:
        setState(transitions.connected(options))
        break
      case HydraEventType.ClientDisconnected:
        setState(transitions.disconnected(options))
        break
      case HydraEventType.Update:
        setState(transitions.handleAppEvent(state, event.output))
        break
      default:
        break
    }
  }, [state])

  useEffect(() => {
    event && callback(event)
  }, [event])

  return Render({ state })
}

export default App
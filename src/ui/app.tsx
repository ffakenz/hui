import { FC, useCallback, useEffect, useState } from "react"
import Render from "./render/main"
import { Options } from "./options"
import { HydraEvent, HydraEventType } from './hydra-ws/events'
import { transitions } from './transitions'
import { onHydraEvent } from "./hydra-ws/hook"

const App: FC<{ options: Options }> = ({ options }) => {
  const [state, setState] = useState(transitions.disconnected(options))
  const [event, setEvent] = useState<HydraEvent | null>(null)

  // set up hydra-ws to `setEvent` on every `emitEvent`
  onHydraEvent(setEvent)

  // callback to be executed on every `event` change
  // the callback may transition the state by calling `setState`
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
  }, [state]) // the callback changes on every `state` transition

  // setup effect to execute callback on every `event` change
  useEffect(() => {
    event && callback(event)
  }, [event])

  return Render({ state })
}

export default App
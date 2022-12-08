import { FC, useState } from "react"
import Render from "./render/main"
import { Options } from "./options"
import { HydraEvent, HydraEventType } from './hydra-ws/events'
import { transitions } from './transitions'
import { onHydraEvent } from "./hydra-ws/hook"

const App: FC<{ options: Options }> = ({ options }) => {
  const [state, setState] = useState(transitions.disconnected(options))

  onHydraEvent((event: HydraEvent) => {
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
  })

  return Render({ state })
}

export default App
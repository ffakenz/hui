
import React, { createContext, useContext } from 'react'
import { SocketService } from './service'

export const ServiceContext: React.Context<SocketService> = createContext(new SocketService())

// functional component context hook
export const useService = () => useContext(ServiceContext)

/*
const service = useService()
const [event, setEvent] = useState<HydraEvent | null>(null)

useEffect(() => {
    const url = `ws://${options.hydraNodeHost.hostname}:${options.hydraNodeHost.port}`
    service.init(url)
      .onMessage()
      .subscribe(setEvent)

    return () => {
      if (service) {
        service.disconnect()
      }
    }
  }, [])
*/
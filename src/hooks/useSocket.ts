import { useEffect, useState } from 'react'

import { io } from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState<any>(null)
  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_SOCKET_URL as string)
    setSocket(newSocket)
    return () => {
      newSocket.disconnect()
    }
  }, [])
  return socket
}

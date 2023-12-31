import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_SOCKET_URL}/api`,
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    })
  }
}

const http = new Http().instance
export default http

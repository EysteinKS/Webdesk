import { createContext } from "react"
import socketClient from "socket.io-client"
import ss from "socket.io-stream"


const url =
process.env.NODE_ENV === "production"
  ? `${window.location.hostname}:${window.location.port}`
  : `${window.location.hostname}:3001`;
  
const socket = socketClient(url , { autoConnect: false });
const audioCtx = new (window.AudioContext || window.webkitAudioContext)()

const context = createContext({ audioCtx, socket })

export default context
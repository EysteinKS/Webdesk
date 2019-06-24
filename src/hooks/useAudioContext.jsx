import {useState, useEffect} from "react"

export default function useAudioContext() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  const [source, setSource] = useState(null)

  //resume audioCtx on mount
  useEffect(() => {
    audioCtx.resume()
  }, [])

  const variables = {
    source
  }

  const setVariables = {
    setSource
  }

  return [audioCtx, variables, setVariables]
}
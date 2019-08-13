import React from "react";
import { useSessionContext } from "../context";

const useSessionButton = (name: string): [string, (payload?: any) => void] => {
  const [{buttonTypes, buttonActions}, dispatch] = useSessionContext()

  const buttons = React.useMemo(() => {
    const buttons = {types: buttonTypes, actions: buttonActions}
    return buttons
  }, [buttonTypes, buttonActions])

  const currentType = React.useMemo(() => {
    return buttons.types[name]
  }, [buttons])

  const onClick = (payload?: any) => {
    if(payload){
      let action = buttons.actions[currentType](payload)
      console.log("action: ", action)
      if(action.action){
        dispatch(action.action)
      } else {
        dispatch(action)
      }
    } else {
      let action = buttons.actions[currentType]()
      console.log("action: ", action)
      if(action.action){
        dispatch(action.action)
      } else {
        dispatch(action)
      }
    }
  }

  return [ currentType, onClick ]
}

export default useSessionButton
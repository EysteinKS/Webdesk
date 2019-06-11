import React, {useState, useEffect} from 'react'
import useForm from "../hooks/useForm"
import { useSelector } from "react-redux"
import { user, userInputFields } from "../constants/types"
import { TextInput } from "./Inputs"

export default function UserSettings() {
  const [lock, setLock] = useState(true)
  const isLoaded = useSelector(state => state.auth.isLoaded)
  const currentUser = useSelector(state => state.auth.user)
  const {inputs, setInputs, handleInputChange} = useForm(user)

  useEffect(() => {
    if(isLoaded) {
      const currentSettings = () => {
        let filteredSettings = {}
        for (let key in user){
          filteredSettings[key] = currentUser[key]
        }
        return filteredSettings
      }
      const initForm = {...user, ...currentSettings()}
      setInputs(initForm)
    }
  }, [isLoaded, currentUser, setInputs])

  return (
    <form onSubmit={e => {
      e.preventDefault()
    }}>
      <fieldset disabled={lock}>
        {userInputFields.map(key => 
          <TextInput disabled={lock} name={key.name} value={inputs[key.name]} onChange={handleInputChange} placeholder={key.placeholder}/>
        )}
        <legend>  
          <button onClick={() => setLock(!lock)}>{lock ? "edit" : "save"}</button>  
        </legend>
      </fieldset>
    </form>
  )
}

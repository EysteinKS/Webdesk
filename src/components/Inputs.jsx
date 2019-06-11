import React from "react"

export const TextInput = ({name, value, onChange, placeholder}) => {
  return (
    <input 
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />)
}
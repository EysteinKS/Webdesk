import React, { useEffect } from 'react'
import { navigate } from "@reach/router"
import { useSelector } from "react-redux"

export default () => {
  const role = useSelector(state => state.auth.user.role)

  useEffect(() => {
    if(role !== "admin"){
      navigate("/")
    }
  }, [role])

  if(role !== "admin") return null
  return (
    <div>
      <h3>Admin</h3>      
    </div>
  )
}

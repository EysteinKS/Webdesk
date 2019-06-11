import React, {useState, useEffect} from 'react'
import { useAuthState } from "react-firebase-hooks/auth"
import {auth} from "../firebase"
import { useDispatch } from "react-redux"
import { doCreateUser, initializeUser, doSignIn, doSignOut } from "../api/auth"
import useForm from "../hooks/useForm"
import {navigate} from "@reach/router"

export default function Auth() {
  const [view, setView] = useState("signin")
  const [user, initializing] = useAuthState(auth)
  const [error, setError] = useState(null)
  const [initUser, setInitUser] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if(user){
      console.log(user)
      if(initUser){
        try {
          dispatch(initializeUser(user.uid))
          setInitUser(false)
        } catch(e) {
          console.log(e.message)
          setError(e.message)
        }
      }
    }
  }, [user, initUser])

  const signIn = (email, password) => doSignIn(email, password)
  const createUser = (email, password) => {
    setInitUser(true)
    try {
      doCreateUser(email, password)
    } catch(e) {
      setError(e.message)
    }
  }

  if(user){
    return <LoggedIn/>
  } else if(initializing){
    return <p>Loading</p>
  } else {
    return (
      <div>
        {(view === "signin")
          ? <>
              <SignInForm onSubmit={signIn}/>
              <span>Don't have a user? <a onClick={() => setView("signup")}>Sign up!</a></span>
            </>
          : <SignUpForm onSubmit={createUser}/>
        }
        {error && <p>{error}</p>}
      </div>
    )
  }
}

export const SignUpForm = ({onSubmit}) => {
  const {inputs, handleInputChange, handleSubmit} = useForm({email: "", password: ""})
  return(
    <form onSubmit={e => {
        handleSubmit(e)
        onSubmit(inputs.email, inputs.password)
      }}
      >
      <p>Sign up</p>
      <input type="text" name="email" value={inputs.email} onChange={e => handleInputChange(e)}/>
      <input type="password" name="password" value={inputs.password} onChange={e => handleInputChange(e)}/>
      <input type="submit" text="Sign up"/>
    </form>
  )
}

export const SignInForm = ({onSubmit}) => {
  const {inputs, handleInputChange, handleSubmit} = useForm({email: "", password: ""})
  return(
    <form onSubmit={e => {
      handleSubmit(e)
      onSubmit(inputs.email, inputs.password)
    }}
    >
      <p>Login</p>
      <input type="text" name="email" value={inputs.email} onChange={e => handleInputChange(e)}/>
      <input type="password" name="password" value={inputs.password} onChange={e => handleInputChange(e)}/>
      <input type="submit" text="Sign in"/>
    </form>
  )
}

export const LoggedIn = () => {
  return(
    <>
      <p>Already logged in!</p>
      <u onClick={() => navigate("/")}>Go to home page?</u>
      <SignOut/>
    </>
  )
}

export const SignIn = () => {

}

export const SignOut = () => {
  return <button onClick={doSignOut}>Sign out</button>
}

export const AuthHeader = () => {

}
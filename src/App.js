import React, { useEffect } from 'react';
import './App.css';

import Navigation from "./components/Navigation"
import { Router } from "@reach/router"
import * as routes from "./constants/routes"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Profile from "./pages/Profile"
import Reception from "./pages/Reception"
import Session from "./pages/Session"

import Auth from "./components/Auth"
import { useAuthState } from "react-firebase-hooks/auth"
import { loadUser } from "./redux/actions/authActions"
import { auth } from "./firebase"

import { useSelector, useDispatch } from "react-redux"

function App() {

  const [user] = useAuthState(auth)
  const dispatch = useDispatch()
  const userIsLoaded = useSelector(state => state.auth.isLoaded)

  useEffect(() => {
    if(user && !userIsLoaded){
      dispatch(loadUser(user.uid))
    }
  }, [user, userIsLoaded, dispatch])

  return (
    <div className="App">
      <Navigation/>
      <div className="App-content">
        {user 
          ? <AuthPage/>
          : <Auth/> }
      </div>
    </div>
  );
}

const AuthPage = () => {
  return(
    <Router primary={false}>
      <Home path={routes.HOME}/>
      <Admin path={routes.ADMIN}/>
      <Profile path={routes.PROFILE}/>
      <Reception path={routes.RECEPTION}/>
      <Session path={routes.SESSION}/>
    </Router>
  )
}


export default App;

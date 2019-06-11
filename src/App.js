import React from 'react';
import './App.css';
import Auth from "./components/Auth"
import Navigation from "./components/Navigation"
import { Router } from "@reach/router"
import * as routes from "./constants/routes"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import Profile from "./pages/Profile"
import Reception from "./pages/Reception"
import Session from "./pages/Session"

import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "./firebase"

function App() {
  const [user] = useAuthState(auth)

  return (
    <div className="App">
      <header className="App-header">
        <Navigation/>
        <p>Webdesk</p>
        {user 
          ? <AuthPage/>
          : <Auth/> }
      </header>
    </div>
  );
}

const AuthPage = () => {
  return(
    <div>
      <Router primary={false}>
        <Home path={routes.HOME}/>
        <Admin path={routes.ADMIN}/>
        <Profile path={routes.PROFILE}/>
        <Reception path={routes.RECEPTION}/>
        <Session path={routes.SESSION}/>
      </Router>
    </div>
  )
}


export default App;

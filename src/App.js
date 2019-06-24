import React, { useEffect, useContext } from "react";
import "./App.css";

import Navigation from "./components/Navigation";
import { Router } from "@reach/router";
import * as routes from "./constants/routes";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Reception from "./pages/Reception";
import Session from "./pages/Session";

import Auth from "./components/Auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { loadUser } from "./redux/actions/authActions";
import { auth } from "./firebase";

import { useSelector, useDispatch } from "react-redux";

import useSocket from "./hooks/useSocket";
import useAudioContext from "./hooks/useAudioContext"

import loadAudio from "./constants/loadAudio"

let source;
let songLength;

function App() {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const userIsLoaded = useSelector(state => state.auth.isLoaded);

  function typedArrayToBuffer(array) {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
  } 

  //const [audioCtx] = useAudioContext()
  const [socket, connect, disconnect, socketMessage, didDisconnect] = useSocket()

  const handleConnect = () => {
    connect(user)
  }

  const handleDisconnect = () => {
    disconnect(user);
  };

  const handleButton = () => {
    if (socket.connected) {
      console.log("Clicking disconnect");
      handleDisconnect();
    } else {
      console.log("Clicking connect");
      handleConnect();
    }
  };

  //LOAD USER AFTER FIREBASE AUTH INIT
  useEffect(() => {
    if (user && !userIsLoaded) {
      dispatch(loadUser(user.uid));
    }
  }, [user, userIsLoaded, dispatch]);

  //CONNECT IF NOT CONNECTED, NOT DISCONNECTED, AND IF USER IS LOADED
  useEffect(() => {
    if (userIsLoaded && !socket.connected && !didDisconnect) {
      console.log("Connecting from useEffect");
      handleConnect();
    }
  }, [userIsLoaded, socket.connected, didDisconnect]);

  return (
    <div className="App">
      <Navigation />
      <header className="App-header">
        <p>Server message: {socketMessage}</p>
        <button onClick={handleButton}>
          {!didDisconnect ? "Disconnect" : "Connect"}
        </button>
        {user ? <AuthPage /> : <Auth />}
      </header>
    </div>
  );
}

const AuthPage = () => {
  return (
    <div>
      <Router>
        <Home path={routes.HOME} />
        <Admin path={routes.ADMIN + "/*"} />
        <Profile path={routes.PROFILE} />
        <Reception path={routes.RECEPTION} />
        <Session path={routes.SESSION} />
      </Router>
    </div>
  );
};

export default App;

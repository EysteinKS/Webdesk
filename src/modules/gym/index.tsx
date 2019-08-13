import React from 'react'
import { SessionProvider, useSessionContext, MatchState } from './context';
import Dashboard from './pages/Dashboard';
import NewSession from './pages/NewSession';
import ActiveSession from './pages/ActiveSession';

const Router = () => {
  const [{page}] = useSessionContext()

  return(
    <>
    <MatchState state={page} value="DASHBOARD" initial>
      <Dashboard/>
    </MatchState>
    <MatchState state={page} value="NEW_SESSION">
      <NewSession/>
    </MatchState>
    <MatchState state={page} value="ACTIVE_SESSION">
      <ActiveSession/>
    </MatchState>
    </>
  )
}

const Gym = () => {
  return(
    <main>
      <SessionProvider>
        <Router/>
      </SessionProvider>
    </main>
  )
}

export default Gym
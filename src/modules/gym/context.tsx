import React, { createContext, useContext, useReducer } from "react"
import { StateProvider, Match } from "../../constants/context";
import { dashboardActions } from "./states";
import reducer from "./reducers";
import { AnyAction } from "redux";
import { GymContext, ContextValue } from "./types/context";

export const MatchState = Match

export const initialSession: GymContext = {
  page: "DASHBOARD",
  state: {

  },
  buttonTypes: {
    mainButton: "NEW_SESSION",
    featuredButton: "SELECT_SESSION"
  },
  buttonActions: dashboardActions
}

//SESSION
export const SessionCtx = createContext<ContextValue | null>(null)

export const useSessionContext = () => useContext(SessionCtx) as ContextValue

export const useSessionContextWithLog = (): [any, React.Dispatch<AnyAction>]  => {
  const context = useContext(SessionCtx) as any
  console.log(context)
  return context
}

export const SessionProvider: React.FC = ({ children }) => {
  return (
    <SessionCtx.Provider value={useReducer(reducer, initialSession)}>
      {children}
    </SessionCtx.Provider>
  )
}

//EXERCISE
const exerciseContext =  createContext({})

export const useExerciseContext = () => useContext(exerciseContext)

export const ExerciseProvider: React.FC = ({ children }) => {
  return (
    <StateProvider
      context={exerciseContext}
      reducer={() => {}}
      initialState={{}}
    >
      {children}
    </StateProvider>
  )
}
//EXERCISE END
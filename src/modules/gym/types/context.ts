import { IStateButtonTypes, IStateButtonActions } from "./buttons";
import { AllStates } from "./states";
import { AnyAction } from "redux";
import { Dispatch } from "react";

export type TSessionPages = (
  "DASHBOARD" |
  "NEW_SESSION" |
  "SESSION_BROWSER" |
  "ACTIVE_SESSION" |
  "EXERCISE"
)

export interface GymContext {
  page: TSessionPages
  state: AllStates | any
  buttonTypes: IStateButtonTypes
  buttonActions: IStateButtonActions
}

export interface SessionContext extends GymContext {
  page: "ACTIVE_SESSION"
  state: AllStates
}

export type ContextValue = [GymContext, Dispatch<AnyAction>]
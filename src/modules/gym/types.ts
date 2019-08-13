import { ITime, ISession } from "../../types/session"
import { ISessionExercise, IExerciseTypes } from "../../types/exercise";
import { AnyAction } from "redux";
import { Dispatch } from "react";
import { buttonActions } from "./states";

export interface Time extends ITime {
  isActive: boolean;
  isPaused: boolean;
}

export interface Session extends ISession {
  time: Time;
  exercises: {
    currentExercise: ISessionExercise;
    queuedExercises: ISessionExercise[];
    finishedExercises: ISessionExercise[];
  }
}

export type TMainButtonTypes = (
  "NEW_SESSION" |
  "OPEN_BROWSE" |
  "OPEN_SESSION" |
  "RESUME_SESSION" |
  "ADD_EXERCISE" |
  "COPY_EXERCISE" |
  "OPEN_EXERCISE" |
  "ADD_SET" |
  "COPY_SET" |
  "START_SET" |
  "FINISH_SET" 
)

export type TSessionDateButtonTypes = (
  "START_SESSION" |
  "FINISH_SESSION"
)

export type TSessionTimeButtonTypes = (
  "SHOW_AUTO_TIME" |
  "SHOW_TOTAL_SESSION_TIME" |
  "SHOW_TOTAL_SET_TIME" |
  "SHOW_EXERCISE_TIME" |
  "SHOW_SET_TIME" |
  "PAUSE_TIME" |
  "RESUME_TIME"
)

export type TBackButtonType = "BACK"

export type TStateButtonType = string

export interface IStateButton {
  type: TStateButtonType
  action: (payload?: any) => any
}

export type TStateButtonAction = AnyAction

export interface IMainButton extends IStateButton {
  type: TMainButtonTypes
}

export interface IStateButtonActions {
  [key: string]: (payload?: any) => TStateButtonAction
}

export interface IStateButtonTypes {
  mainButton: TMainButtonTypes
  [key: string]: TStateButtonType
}

export type DefaultSessionState = {

}

export interface TActiveSessionState extends DefaultSessionState {
  exerciseList: IExerciseTypes[]
  isExerciseOpen: boolean
}

export type TSessionStates = TActiveSessionState | DefaultSessionState


export type TSessionPages = (
  "DASHBOARD" |
  "NEW_SESSION" |
  "SESSION_BROWSER" |
  "ACTIVE_SESSION" |
  "EXERCISE"
)

export interface PageContext {
  page: TSessionPages
  state?: TSessionStates
  buttonTypes: IStateButtonTypes
  buttonActions: IStateButtonActions
}

export interface SessionContext {
  page: TSessionPages
  state: TSessionStates
  buttonTypes: IStateButtonTypes,
  buttonActions: IStateButtonActions
}

export type SessionContextValue = [SessionContext, Dispatch<AnyAction>]
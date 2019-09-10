import { AnyAction } from "redux";

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
import { AnyAction } from "redux";

export type ChangeButtonTypes = (
  "CHANGE_MAIN_BUTTON"
)

export const changeButtonTypes = {
  CHANGE_MAIN_BUTTON: "CHANGE_MAIN_BUTTON"
}

export const CHANGE_MAIN_BUTTON = "CHANGE_MAIN_BUTTON"
export const changeMainButton = (buttonAction: string) => ({
  type: CHANGE_MAIN_BUTTON,
  payload: buttonAction
})

type actionCreator = (payload?: any) => AnyAction
type changeAction = AnyAction | actionCreator

export const CHANGE_BUTTON_ACTION = "CHANGE_BUTTON_ACTION"
export const changeButtonAction = (type: string, action: changeAction) => ({
  type: CHANGE_BUTTON_ACTION,
  payload: { type, action }
})

export const buttonTypes = {
  CHANGE_MAIN_BUTTON,
  CHANGE_BUTTON_ACTION
}
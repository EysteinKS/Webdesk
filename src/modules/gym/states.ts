import { Dispatch } from "react";
import { AnyAction } from "redux";
import { pageActions, selectActions } from "./actions/session";

//VIEWS
const dashboard = {

}

const newSession = {
  open: {

  },
  closed: {

  }
}

export const views = {
  dashboard,
  newSession
}

//BUTTONS
export const buttonActions = {
  NEW_SESSION: () => ({
    type: "NEW_SESSION",
    action: pageActions.OPEN_NEW_SESSION()
  }),
  OPEN_BROWSE: () => ({
    type: "OPEN_BROWSE",
    action: pageActions.OPEN_BROWSE()
  }),
  OPEN_SESSION: () => ({
    type: "OPEN_SESSION",
    action: pageActions.OPEN_ACTIVE_SESSION()
  }),
  RESUME_SESSION: () => ({
    type: "RESUME_SESSION"
  }),
  SELECT_SESSION: (payload: string) => ({
    type: "SELECT_SESSION",
    action: selectActions.SELECT(payload)
  }),
  DESELECT_SESSION: () => ({
    type: "DESELECT_SESSION",
    action: selectActions.DESELECT()
  })
}

export const dashboardActions = {
  NEW_SESSION: buttonActions.NEW_SESSION,
  SELECT_SESSION: buttonActions.SELECT_SESSION,
  DESELECT_SESSION: buttonActions.DESELECT_SESSION,
  OPEN_SESSION: buttonActions.OPEN_SESSION
}

export const sessionClock = {

}

export const sessionTimer = {

}
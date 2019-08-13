import { actionCreator } from "./index"

//TYPES

export type NavigationTypes = (
  "OPEN_DASHBOARD" | "CLOSE_DASHBOARD" |
  "OPEN_NEW_SESSION" | "CLOSE_NEW_SESSION" |
  "OPEN_BROWSE" | "CLOSE_BROWSE" |
  "OPEN_ACTIVE_SESSION" | "CLOSE_ACTIVE_SESSION"
)

export const pageTypes = {
  OPEN_DASHBOARD: "OPEN_DASHBOARD",
  CLOSE_DASHBOARD: "CLOSE_DASHBOARD",
  OPEN_NEW_SESSION: "OPEN_NEW_SESSION",
  CLOSE_NEW_SESSION: "CLOSE_NEW_SESSION",
  OPEN_BROWSE: "OPEN_BROWSE",
  CLOSE_BROWSE: "CLOSE_BROWSE",
  OPEN_ACTIVE_SESSION: "OPEN_ACTIVE_SESSION",
  CLOSE_ACTIVE_SESSION: "CLOSE_ACTIVE_SESSION"
}

export const pageActions = {
  OPEN_DASHBOARD: () => actionCreator(pageTypes.OPEN_DASHBOARD),
  CLOSE_DASHBOARD: () => actionCreator(pageTypes.CLOSE_DASHBOARD),
  OPEN_NEW_SESSION: () => actionCreator(pageTypes.OPEN_NEW_SESSION),
  CLOSE_NEW_SESSION: () => actionCreator(pageTypes.CLOSE_NEW_SESSION),
  OPEN_BROWSE: () => actionCreator(pageTypes.OPEN_BROWSE),
  CLOSE_BROWSE: () => actionCreator(pageTypes.CLOSE_BROWSE),
  OPEN_ACTIVE_SESSION: () => actionCreator(pageTypes.OPEN_ACTIVE_SESSION),
  CLOSE_ACTIVE_SESSION: () => actionCreator(pageTypes.CLOSE_ACTIVE_SESSION)
}

export const selectTypes = {
  SELECT: "SELECT",
  DESELECT: "DESELECT",
}

export const selectActions = {
  SELECT: (payload: string) => actionCreator(selectTypes.SELECT, {id: payload}),
  DESELECT: () => actionCreator(selectTypes.DESELECT),
}
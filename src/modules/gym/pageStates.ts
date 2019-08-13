import { SessionContext, TSessionPages, PageContext } from "./types";
import { buttonActions } from "./states";
import { activeActions } from "./actions/activeSession";

const dashboardActions = {
  NEW_SESSION: buttonActions.NEW_SESSION,
  SELECT_SESSION: buttonActions.SELECT_SESSION,
  DESELECT_SESSION: buttonActions.DESELECT_SESSION,
  OPEN_SESSION: buttonActions.OPEN_SESSION
}

const dashboardPage: PageContext = {
  page: "DASHBOARD",
  buttonTypes: {
    mainButton: "NEW_SESSION",
    featuredButton: "SELECT_SESSION"
  },
  buttonActions: dashboardActions
}

const newSessionActions = {
  OPEN_SESSION: buttonActions.OPEN_SESSION,
  OPEN_BROWSE: buttonActions.OPEN_BROWSE
}

const newSessionPage: PageContext = {
  page: "NEW_SESSION",
  buttonTypes: {
    mainButton: "OPEN_SESSION"
  },
  buttonActions: newSessionActions
}

const activeSessionPage: PageContext = {
  page: "ACTIVE_SESSION",
  state: {
    exerciseList: [],
    isExerciseOpen: false
  },
  buttonTypes: {
    mainButton: "ADD_EXERCISE",
    addExercise: "ADD_EXERCISE",
    createCustomExercise: "CREATE_CUSTOM_EXERCISE"
  },
  buttonActions: activeActions
}

const allPages: {[key: string]: PageContext} = {
  DASHBOARD: dashboardPage,
  NEW_SESSION: newSessionPage,
  ACTIVE_SESSION: activeSessionPage
}

export const getPageState = (type: TSessionPages) => {
  if(type in allPages){
    return allPages[type]
  } else {
    throw new Error(`${type} not in allPages`)
  }
}
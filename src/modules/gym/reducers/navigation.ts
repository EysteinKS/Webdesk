import { NavigationTypes, pageTypes } from "../actions/session";
import { SessionContext, GymContext } from "../types/context";
import { getPageState } from "../pageStates";

const navigationReducer = (type: NavigationTypes, draft: GymContext): GymContext => {
  switch(type){
    case pageTypes.OPEN_NEW_SESSION:
        let newSessionState = getPageState("NEW_SESSION")
        draft = {...draft, ...newSessionState}
        return draft
      case pageTypes.OPEN_ACTIVE_SESSION:
        let activeSessionState = getPageState("ACTIVE_SESSION")
        draft = {...draft, ...activeSessionState}
        return draft
      case pageTypes.OPEN_BROWSE:
        let browseState = getPageState("SESSION_BROWSER")
        draft = {...draft, ...browseState}
        return draft
    default:
      return draft
  }
}

export default navigationReducer
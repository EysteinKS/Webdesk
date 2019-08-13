import { SessionContext } from "../types";
import { CHANGE_MAIN_BUTTON, CHANGE_BUTTON_ACTION } from "../actions/buttons";
import { AnyAction } from "redux";

const buttonReducer = (type: string, draft: SessionContext, action?: AnyAction): SessionContext => {
  switch(type){
    case CHANGE_MAIN_BUTTON:
      if(action) draft.buttonTypes.mainButton = action.payload
      return draft
    case CHANGE_BUTTON_ACTION:
      if(action) {
        draft.buttonActions[action.payload.type] = action.payload.action
      }
      return draft
    default:
      return draft
  }
}

export default buttonReducer
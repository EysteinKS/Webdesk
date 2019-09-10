import { CHANGE_MAIN_BUTTON, CHANGE_BUTTON_ACTION } from "../actions/buttons";
import { AnyAction } from "redux";
import { GymContext } from "../types/context";

const buttonReducer = (type: string, draft: GymContext, action?: AnyAction): GymContext => {
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
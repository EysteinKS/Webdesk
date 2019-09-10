import { AnyAction } from "redux";
import { initialSession } from "../context";
import produce from "immer";
import { pageTypes } from "../actions/session";
import navigationReducer from "./navigation";
import { buttonTypes } from "../actions/buttons";
import buttonReducer from "./buttons";
import { activeTypes } from "../actions/activeSession";
import activeSessionReducer from "./session";
import { GymContext } from "../types/context";

export default (state: GymContext = initialSession, action: AnyAction) =>
  produce(state, draft => {
    console.log(action)
    switch(true) {
      case (action.type in pageTypes):
        return navigationReducer(action.type, draft)
      case (action.type in buttonTypes):
        return buttonReducer(action.type, draft, action)
      case (action.type in activeTypes):
        console.log("actiontype in activeTypes")
        return activeSessionReducer(action.type, draft, action)
      default:
        return state;
    }
  })
import * as actions from "../actions/authActions"
import * as states from "./states"
import * as drafts from "./drafts"
import produce from "immer"

const initialState = {
  ...states.saving,
  ...states.loading,
  isLoggedIn: false,
  user: {
    uid: "",
    role: ""
  }
}

export default (state = initialState, {type, payload}) => 
  produce(state, draft => {
    switch(type){
      case actions.LOAD_USER_BEGIN:
        return drafts.loadBegin(draft)
      case actions.LOAD_USER_SUCCESS:
        return drafts.loadSuccess(draft, "user", payload)
      case actions.LOAD_USER_FAILURE:
        return drafts.loadFailure(draft, payload)
      default:
        break
    }
  })
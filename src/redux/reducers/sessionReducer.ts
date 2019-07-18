import produce from "immer";
import { ISession } from "../../types/session";
import { AnyAction } from "redux";

export default (state: ISession, {type, payload}: AnyAction) => 
  produce(state, draft => {
    return draft
  })
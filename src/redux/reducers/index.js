import { combineReducers } from "redux"
import auth from "./authReducers"
import reception from "./receptionReducers"

export default combineReducers({ auth, reception })

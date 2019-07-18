import { ISession } from "../types/session";

export default interface RootState {
  auth: AuthState
  session: ISession
}

export interface AuthState {
  isSaved: boolean,
  isSaving: boolean,
  savingError: string,
  isLoading: boolean,
  isLoaded: boolean,
  loadingError: string,
  isLoggedIn: boolean,
  user: {
    uid: string,
    role: string,
    currentLocation: string
  }
}

export interface SessionState {

}
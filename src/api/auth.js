import {auth, firestore} from "../firebase"
import {loadUserBegin, loadUserSuccess, loadUserFailure} from "../redux/actions/authActions"

const initialUser = uid => {
  return { uid: uid }}


export const initializeUser = (uid) => dispatch => {
  dispatch(loadUserBegin())
  try {
    firestore.doc(`Users/${uid}`).set(initialUser(uid))
      .then(() => 
        dispatch(loadUserSuccess(initialUser(uid)))
      )
  } catch(e) {
    dispatch(loadUserFailure(e.message))
  }
}

export const doCreateUser = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
}

export const doSignIn = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
}

export const doSignOut = () =>
  auth.signOut();

export const getUser = () =>
  auth.currentUser;
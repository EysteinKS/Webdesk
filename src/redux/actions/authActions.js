import {firestore} from "../../firebase"

export const LOAD_USER_BEGIN = 'LOAD_USER_BEGIN'
export const loadUserBegin = () => ({
  type: LOAD_USER_BEGIN,
})

export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const loadUserSuccess = (user) => ({
  type: LOAD_USER_SUCCESS,
  payload: user
})

export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE'
export const loadUserFailure = error => ({
  type: LOAD_USER_FAILURE,
  payload: error
})

export const loadUser = (uid) => dispatch => {
  console.log("loading user with uid ", uid)
  dispatch(loadUserBegin())
  firestore.doc(`Users/${uid}`).get()
    .then(response => {
      let data = response.data()
      dispatch(loadUserSuccess(data))
    })
    .catch(err => dispatch(loadUserFailure(err.message)))
}

export const SAVE_USER_BEGIN = 'SAVE_USER_BEGIN'

export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS'

export const SAVE_USER_FAILURE = 'SAVE_USER_FAILURE'

export const RESET_AUTH = 'RESET_AUTH'
export const resetAuth = () => ({
  type: RESET_AUTH
})

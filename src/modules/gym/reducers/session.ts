import { activeTypes, ActiveSessionTypes } from "../actions/activeSession";
import { AnyAction } from "redux";
import { createBlankExercise, createCustomExercise, createDefinedExercise } from "../api/exercises";
import { GymContext } from "../types/context";

const activeSessionReducer = (type: ActiveSessionTypes, draft: GymContext, action?: AnyAction): GymContext => {
  console.log(action) 
  switch(type){
    case activeTypes.ADD_EXERCISE:
      if("exercises" in draft.state) {
        const blankExercise = createBlankExercise()
        draft.state.exercises.queuedExercises.push(blankExercise)
      }
      return draft
    case activeTypes.CREATE_CUSTOM_EXERCISE:
      if("exercises" in draft.state) {
        draft.state.exercises.queuedExercises.pop()
        const customExercise = createCustomExercise()
        draft.state.exercises.queuedExercises.push(customExercise)
      }
      return draft
    case activeTypes.CREATE_ENDURANCE_EXERCISE:
      if("exercises" in draft.state && action) {
        draft.state.exercises.queuedExercises.pop()
        const enduranceExercise = createDefinedExercise("ENDURANCE", action.payload)
        draft.state.exercises.queuedExercises.push(enduranceExercise)
      }
      return draft
    case activeTypes.CREATE_TARGET_EXERCISE:
      if("exercises" in draft.state && action) {
        draft.state.exercises.queuedExercises.pop()
        const targetExercise = createDefinedExercise("TARGET", action.payload)
        draft.state.exercises.queuedExercises.push(targetExercise)
      }
      return draft
    case activeTypes.CREATE_REPETITION_EXERCISE:
      if("exercises" in draft.state && action) {
        draft.state.exercises.queuedExercises.pop()
        const targetExercise = createDefinedExercise("REPETITION", action.payload)
        draft.state.exercises.queuedExercises.push(targetExercise)
      }
      return draft
    case activeTypes.REMOVE_EXERCISE:
      if("exercises" in draft.state && action) {
        draft.state.exercises.queuedExercises.splice(action.payload, 1)
      }
      return draft
    case activeTypes.OPEN_EXERCISE:
      if("exercises" in draft.state && action){
        const exercise = draft.state.exercises.queuedExercises[action.payload]
        draft.state.exercises.currentExercise = {...exercise, index: action.payload}
      }
      return draft
    case activeTypes.SAVE_EXERCISE:
      if("exercises" in draft.state && action){
        const { index, ...exercise } = draft.state.exercises.currentExercise
      }
      return draft
    case activeTypes.CLOSE_EXERCISE:
      if("exercises" in draft.state && action){
        draft.state.exercises.currentExercise = null
      }
      return draft
    default:
      return draft
  }
}

export default activeSessionReducer
import { SessionContext } from "../types";
import { activeTypes, ActiveSessionTypes } from "../actions/activeSession";
import { AnyAction } from "redux";
import { IExerciseTypes, IPrivateExercise } from "../../../types/exercise";

const activeSessionReducer = (type: ActiveSessionTypes, draft: SessionContext, action?: AnyAction): SessionContext => {  
  switch(type){
    case activeTypes.ADD_EXERCISE:
      if("exerciseList" in draft.state) {
        const newExercise = createNewExercise()
        draft.state.exerciseList.push(newExercise)
      }
      return draft
      case activeTypes.CREATE_CUSTOM_EXERCISE:
          if("exerciseList" in draft.state && action) {
            draft.state.exerciseList.pop()
            const customExercise = createCustomExercise(action.payload)
            draft.state.exerciseList.push(customExercise)
          }
          return draft
    default:
      return draft
  }
}

const createNewExercise = (): IExerciseTypes => {
  return {
    name: "",
    owner: "",
    description: "",
    tags: [],
    sets: [],
    steps: [],
    isFreeWeight: true,
    weights: []
  }
}

const createCustomExercise = (owner: string ): IPrivateExercise => {
  return {
    name: "",
    owner: owner,
    description: "",
    tags: [],
    sets: [],
    steps: [],
    isFreeWeight: true,
    weights: [],
    personalRating: 0,
    comments: [],
    isCustom: true
  }
}

export default activeSessionReducer
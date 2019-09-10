import { BlankExercise, CustomExercise, DefinedExercises, DefinedTypes, EnduranceExercise, TargetExercise, Goal, RepetitionExercise } from "../types/exercises";

//START NEW EXERCISES
export const createBlankExercise = (): BlankExercise => ({
  type: "BLANK",
  search: "",
  selected: ""
})

export const createCustomExercise = (): CustomExercise => ({
  type: "CUSTOM",
  selected: null
})
//END NEW EXERCISES


//START DEFINED EXERCISES

interface ExerciseSettings {
  owner: string
}

const newGoal = (): Goal => {
  return {
    measure: null,
    target: null
  }
}

const createEnduranceExercise = ({owner}: ExerciseSettings): EnduranceExercise => ({
  type: "ENDURANCE",
  owner,
  goal: newGoal()
})

const createTargetExercise = ({owner}: ExerciseSettings): TargetExercise => ({
  type: "TARGET",
  owner,
  goal: {...newGoal(), target: 0}
})

const createRepetitionExercise = ({owner}: ExerciseSettings): RepetitionExercise => ({
  type: "REPETITION",
  owner,
  sets: []
})


export const createDefinedExercise = (type: DefinedTypes, owner: string): DefinedExercises => {
  let exercise
  switch(type){
    case "ENDURANCE":
      exercise = createEnduranceExercise({owner})
      break;
    case "TARGET":
      exercise = createTargetExercise({owner});
      break;
    case "REPETITION":
      exercise = createRepetitionExercise({owner});
      break;
    default:
      exercise = createEnduranceExercise({owner})
      break;
  }
  return exercise
}

//END DEFINED EXERCISES
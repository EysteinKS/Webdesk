import { useSessionContext } from "../context"
import { AllStates } from "../types/states"
import { AllDefinedExercises } from "../types/exercises"
import { useState, useMemo } from "react"
import { activeActions } from "../actions/activeSession"

export const useCurrentExercise = () => {
  const [context, dispatch] = useSessionContext()
  const state = context.state as AllStates
  const currentExercise = state.exercises.currentExercise as AllDefinedExercises
  const {index, name, description, steps} = currentExercise

  const [exerciseName, setExerciseName] = useState((name ? name : ""))
  const [exerciseDesc, setExerciseDesc] = useState((description ? description : ""))
  const [exerciseSteps, setExerciseSteps] = useState((steps ? steps : []))

  const exercise = useMemo((): AllDefinedExercises => {
    return {
      ...currentExercise,
      name: exerciseName,
      description: exerciseDesc,
      steps: exerciseSteps
    }
  }, [currentExercise, exerciseName, exerciseDesc, exerciseSteps])

  const setExercise = {
    name: setExerciseName,
    description: setExerciseDesc,
    steps: setExerciseSteps
  }

  const saveExercise = (exercise: AllDefinedExercises) => {
    index && dispatch(activeActions.SAVE_EXERCISE({exercise, index}))
  }

  return [exercise, setExercise, saveExercise]
}
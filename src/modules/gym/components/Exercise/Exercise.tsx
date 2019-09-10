import React from 'react'
import { useSessionContext } from '../../context'
import { AllStates } from '../../types/states'
import EnduranceExercise from './EnduranceExercise'
import TargetExercise from './TargetExercise'
import RepetitionExercise from './RepetitionExercise'

export default () => {
  const [context, dispatch] = useSessionContext()
  const state = context.state as AllStates
  const currentExercise = state.exercises.currentExercise
  const type = currentExercise && currentExercise.type

  
  return (
    <>
      {(type === "ENDURANCE") && <EnduranceExercise/>}
      {(type === "TARGET") && <TargetExercise/>}
      {(type === "REPETITION") && <RepetitionExercise/>}
    </>
  )
}

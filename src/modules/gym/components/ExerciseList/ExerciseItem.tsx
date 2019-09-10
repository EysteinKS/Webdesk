import React from 'react'
import { AllExercises } from '../../types/exercises'
import BlankExercise from './BlankExercise'
import CustomExercise from './CustomExercise'
import EnduranceExercise from './EnduranceExercise'
import RepetitionExercise from './RepetitionExercise'
import TargetExercise from './TargetExercise'


interface IProps {
  exercise: AllExercises
  index: number
}

const ExerciseItem: React.FC<IProps> = ({ exercise, index }) => {
  switch(exercise.type){
    case "BLANK":
      return <BlankExercise/>
    case "CUSTOM":
      return <CustomExercise/>
    case "ENDURANCE":
      return <EnduranceExercise exercise={exercise} index={index}/>
    case "REPETITION":
      return <RepetitionExercise exercise={exercise} index={index}/>
    case "TARGET":
      return <TargetExercise exercise={exercise} index={index}/>
    default:
      return <BlankExercise/>
  }
}

export default ExerciseItem
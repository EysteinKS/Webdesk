import React from 'react'
import SessionExercise from "./SessionExercise"

export default () => {
  const listOfExercises = [1, 2, 3]

  return (
    <div>
      {listOfExercises.map(exercise => <SessionExercise exercise={exercise}/>)}
    </div>
  )
}

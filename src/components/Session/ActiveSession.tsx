import React from "react"

import SessionExercise from "./SessionExercise"
import { SessionWrapper } from "../Styled";

const ActiveSession = () => {
  const listOfExercises = [1]
  let Element: any = SessionExercise
  return (
      <SessionWrapper>
        {listOfExercises.map(exercise => 
          <Element key={"exercise_" + exercise} exercise={exercise}/>)}
      </SessionWrapper>
  )
}

export default ActiveSession 
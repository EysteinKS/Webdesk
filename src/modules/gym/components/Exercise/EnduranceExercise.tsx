import React, { useState } from 'react'
import { useSessionContext } from '../../context'
import { AllStates } from '../../types/states'
import { EnduranceExercises, Goal } from '../../types/exercises'
import styled from 'styled-components'
import { activeActions } from '../../actions/activeSession'
import { useCurrentExercise } from '../../hooks/useSessionExercise'

export default () => {
  const [{}, dispatch] = useSessionContext()
  const [exercise, setExercise, saveExercise] = useCurrentExercise()
  const {id, name, index, description, steps, goal} = exercise as EnduranceExercises

  return (
    <StyledWrapper>
      <StyledHeader>
        {id ? <h3>{id}</h3> : <div/>}
        <h1>{name ? name : "ENDURANCE"}</h1>
        <p>{index}</p>
      </StyledHeader>
      <StyledContent>
        <StyledGoal>
          Goal
        </StyledGoal>
        <StyledDesc>{description}</StyledDesc>
      </StyledContent>
      <button onClick={() => dispatch(activeActions.CLOSE_EXERCISE())}>Close</button>
    </StyledWrapper>
  )
}

const StyledGoal = styled.div`
  place-self: center;
`

const StyledDesc = styled.textarea`

`

const StyledSteps = styled.div`
`

const StyledWrapper = styled.div`
  display: grid;
  height: 71vh;
  grid-template-rows: 1fr 5fr 1fr
`

const StyledContent = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr
`

const StyledHeader = styled.header`
  width: 100%;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`
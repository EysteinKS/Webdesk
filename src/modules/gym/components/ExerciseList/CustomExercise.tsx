import React, { useState } from 'react'
import { useSessionContext } from '../../context'
import { DefinedTypes } from '../../types/exercises'
import styled from 'styled-components'
import { ListItemStyles } from './styles'
import { createDefinedActions, activeActions } from '../../actions/activeSession'
import { AllStates } from '../../types/states'

const CustomExercise = () => {
  const [context, dispatch] = useSessionContext()
  const [selected, setSelected] = useState("ENDURANCE" as DefinedTypes)

  const createExercise = () => {
    const action = createDefinedActions[selected]
    dispatch(action())
  }

  const removeExercise = () => {
    const state = context.state as AllStates
    const index = state.exercises.queuedExercises.length - 1
    const action = activeActions.REMOVE_EXERCISE(index)
    console.log(action)
    dispatch(action)
  }

  return (
    <StyledWrapper>
      <ExerciseSelector 
        start="true" selected={(selected === "ENDURANCE")} onClick={() => {
          setSelected("ENDURANCE")
        }}
      >ENDURANCE</ExerciseSelector>
      <ExerciseSelector 
        selected={(selected === "TARGET")} onClick={() => {
          setSelected("TARGET")
        }}
      >TARGET</ExerciseSelector>
      <ExerciseSelector 
        selected={(selected === "REPETITION")} onClick={() => {
          setSelected("REPETITION")
        }}
      >SET</ExerciseSelector>
      <ExerciseSelector 
        background="#b7fbbd"
        disabled={(selected == null)} onClick={() => {
        createExercise()
      }}
      >^</ExerciseSelector>
      <ExerciseSelector
        background="#ffb4b4"
        end="true" onClick={() => {
          removeExercise()
        }}
      >X</ExerciseSelector>
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  ${ListItemStyles}
  display: grid;
  grid-template-columns: 25% 25% 25% 12.5% 12.5%;
  max-width: 100%;
`

interface SelectorProps {
  start?: "true"
  end?: "true"
  selected?: boolean
  background?: string
}

const ExerciseSelector = styled.button`
  background-color: #eee;
  font-size: 0.5em;
  width: 100%;
  max-width: 100%;
  ${({start, end, selected, background}: SelectorProps) => {
    let style: string = ""
    if(start) { style += " border-radius: 1rem 0 0 1rem;" }
    if(end) { style += "border-radius: 0 1rem 1rem 0;" }
    if(background) { style += `background-color: ${background};`}
    if(selected) { style += `background-color: #4cabff; color: white;` }
    return style
  }}
`

export default CustomExercise
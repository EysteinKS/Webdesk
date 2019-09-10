import React from 'react'
import { RepetitionExercises } from '../../types/exercises'
import { ListItemStyles } from './styles'
import styled from 'styled-components'
import { useSessionContext } from '../../context'
import { activeActions } from '../../actions/activeSession'

interface IProps {
  exercise: RepetitionExercises
  index: number
}

const RepetitionExercise: React.FC<IProps> = ({ exercise, index }) => {
  const [{}, dispatch] = useSessionContext()
  
  const openExercise = () => {
    dispatch(activeActions.OPEN_EXERCISE(index))
  }

  return (
    <StyledWrapper onClick={openExercise}>
      REPETITION
    </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  ${ListItemStyles}
  display: grid;
  grid-template-columns: 1fr;
  place-content: center;
  background-color: gray;
`

export default RepetitionExercise
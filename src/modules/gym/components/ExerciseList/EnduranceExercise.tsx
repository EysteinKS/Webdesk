import React from 'react'
import { EnduranceExercises } from '../../types/exercises'
import styled from 'styled-components'
import { ListItemStyles } from './styles'
import { useSessionContext } from '../../context'
import { activeActions } from '../../actions/activeSession'

interface IProps {
  exercise: EnduranceExercises
  index: number
}

const EnduranceExercise: React.FC<IProps> = ({ exercise, index }) => {
  const [{}, dispatch] = useSessionContext()
  
  const openExercise = () => {
    dispatch(activeActions.OPEN_EXERCISE(index))
  }

  return (
    <StyledWrapper onClick={openExercise}>
      ENDURANCE
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

export default EnduranceExercise
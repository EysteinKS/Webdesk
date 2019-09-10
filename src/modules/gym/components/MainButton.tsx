import React from 'react'
import useSessionButton from '../hooks/useSessionButton';
import styled from 'styled-components';
import { useSessionContext } from '../context';

const StyledButton = styled.button`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  position: relative;
  bottom: 10px;
`

const MainButton = () => {
  const [type, onClick] = useSessionButton("mainButton")

  const content = React.useMemo(() => {
    const stringArr = type.split("_")
    return stringArr[0]
  }, [type])

  const [context] = useSessionContext()
  const disabled = React.useMemo(() => {
    if("exercises" in context.state){
      const queue = context.state.exercises.queuedExercises
      if(queue.length && (["BLANK", "CUSTOM"].includes(queue[queue.length - 1].type))){
        return true
      }
    }
    return false
  }, [context.state])

  return (
    <StyledButton disabled={disabled} onClick={() => onClick()}>
      {content}
    </StyledButton>
  )
}

export default MainButton
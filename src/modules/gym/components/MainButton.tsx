import React from 'react'
import useSessionButton from '../hooks/useSessionButton';
import styled from 'styled-components';

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

  return (
    <StyledButton onClick={() => onClick()}>
      {content}
    </StyledButton>
  )
}

export default MainButton
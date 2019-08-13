import React from 'react'
import styled from 'styled-components';
import MainButton from './MainButton';

const StyledFooter = styled.footer`
  height: 5vh;
  width: 100vw;
  background-color: rgb(80, 80, 80);
  display: grid;
  grid-template-columns: repeat(3, 1fr)
`

const LeftButtonWrapper = styled.div`
  grid-column: 1 / 2
`

const MainButtonWrapper = styled.div`
  grid-column: 2 / 3;
  place-self: center;
  position: relative;
  bottom: 3vh
`

const RightButtonWrapper = styled.div`
  grid-column: 3 / 4
`

interface IProps {
  left?: JSX.Element
  right?: JSX.Element
}

const Footer: React.FC<IProps> = ({ left, right }) => {
  return (
    <StyledFooter>
      {left && <LeftButtonWrapper>{left}</LeftButtonWrapper>}
      <MainButtonWrapper><MainButton/></MainButtonWrapper>
      {right && <RightButtonWrapper>{right}</RightButtonWrapper>}
    </StyledFooter>
  )
}

export default Footer
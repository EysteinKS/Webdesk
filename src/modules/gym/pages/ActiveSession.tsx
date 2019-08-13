import React, { useEffect } from "react"
import styled from "styled-components";
import Footer from "../components/Footer";
import { DigitalFont } from "../styles";
import ExerciseList from "../components/ExerciseList";
import { useSessionContext } from "../context";
import { useSelector } from "react-redux";
import RootState from "../../../redux/types";
import { changeButtonAction } from "../actions/buttons";
import { actionCreator } from "../actions";

const Session = styled.section`
  height: 78vh;
  display: grid;
  grid-template-columns: 1fr;
  overflow-y: auto;
  margin-top: 7vh;
`

const ActiveSession = () => {
  const [{}, dispatch] = useSessionContext()
  const uid = useSelector((state: RootState) => state.auth.user.uid)

  useEffect(() => {
    const type = "CREATE_CUSTOM_EXERCISE"
    console.log("uid: ", uid)
    dispatch(changeButtonAction(type, () => ({type: type, payload: uid})))
  }, [])

  return(
    <>
    <ActiveSessionHeader/>
    <Session>
      <ExerciseList/>
    </Session>
    <Footer/>
    </>
  )
}


const StyledSessionHeader = styled.header`
  height: 5vh;
  width: 100vw;
  background-color: #444
  display: grid;
  grid-template-columns: 1fr 1fr 1fr
`

const TimerWrapper = styled.div`
  grid-column: 2 / 3;
  background-color: #000;
  place-self: center;
  box-sizing: border-box;
  border: 5px inset silver;
  max-height: 10vh;
`

const TimerText = styled(DigitalFont)`
  color: #00CC00;
  font-size: 3ch;
  padding: 0.6rem;
  margin: 0;
`

const ActiveSessionHeader = () => {
  return(
    <StyledSessionHeader>
      <TimerWrapper>
        <TimerText>88:88</TimerText>
      </TimerWrapper>
    </StyledSessionHeader>
  )
}

export default ActiveSession
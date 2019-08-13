import styled from "styled-components"

export const ExerciseWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props: { columns: number }) => props.columns}, 1fr);
  background-color: gray;
  border-radius: 10px;
  place-items: center;
  margin-bottom: 5vh;
`

export const SessionWrapper = styled.div`
  border-radius: 10px;
  place-items: center;
  margin: 5vh 10vw;
`


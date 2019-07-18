import styled from "styled-components"

export const ExerciseWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props: { columns: number }) => props.columns}, 1fr);
  background-color: gray;
  border-radius: 10px;
  place-items: center;
  grid-column: 2 / 3;
  grid-columns: 2 / 4;
`

export const SessionWrapper = styled.div`
  display: grid;
  grid-template-columns:  1fr 1fr 1fr;
  grid-template-rows: 10px 1fr 1fr 1fr;
  border-radius: 10px;
  place-items: center;
`


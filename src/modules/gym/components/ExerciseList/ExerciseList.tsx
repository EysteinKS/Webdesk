import React from 'react'
import styled from 'styled-components';
import useSessionButton from '../../hooks/useSessionButton';
import { useSessionContext } from '../../context';
import { AllStates } from '../../types/states';
import { ListItemStyles } from './styles';
import ExerciseItem from './ExerciseItem';

const ExerciseList: React.FC = () => {
  const [ context ] = useSessionContext()
  const state = context.state as AllStates
  console.log("State: ", state)
  const queue = state.exercises.queuedExercises

  const exercises = React.useMemo(() => {
    let exerciseList: JSX.Element[] = []
    if(queue.length > 0){
      exerciseList = queue.map((exercise, i) =>
        <ExerciseItem key={`${exercise.type}_ITEM_${i}`} exercise={exercise} index={i}/>
      )
    }
    if(queue.length === 0 || (queue.length && !(["BLANK", "CUSTOM"].includes(queue[queue.length - 1].type)))) {
      exerciseList.push(<AddExercise key="add_exercise"/>)
    }
    return exerciseList
  }, [queue])

  return (
    <List length={exercises.length}>
      {exercises}
    </List>
  )
}

const List = styled.div`
  padding: 0;
  padding-bottom: 10vh;
  margin: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 2vh;
  place-items: center;
  grid-template-rows: ${(props: { length: number }) => `repeat(${props.length}, 10vh)`}
`

const AddButton = styled.button`
  ${ListItemStyles}
  font-size: 2rem;
  border: 3px inset #ffffffcc;
  background: none;
`

const AddExercise = () => {
  const [type, onClick] = useSessionButton("addExercise")
  return(
    <AddButton onClick={onClick}>+</AddButton>
  )
}

export default ExerciseList
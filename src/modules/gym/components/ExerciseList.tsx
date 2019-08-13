import React, { useState, useEffect } from 'react'
import styled from 'styled-components';
import useSessionButton from '../hooks/useSessionButton';
import { useSessionContext } from '../context';
import { changeMainButton } from '../actions/buttons';
import { TActiveSessionState } from '../types';
import { useSelector } from 'react-redux';
import RootState from '../../../redux/types';

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

const ExerciseList: React.FC = () => {
  const [ context ] = useSessionContext()
  const state = context.state as TActiveSessionState
  const list = state.exerciseList

  const exercises = React.useMemo(() => {
    let exerciseList: JSX.Element[] = []
    if(list.length > 0){
      exerciseList = list.map((exercise, i) => {
        if(exercise.owner === "") {
          return <BlankExercise key={"blank_" + i}/>
        } else if(exercise.owner.length > 0 && exercise.isCustom){
          return <CustomExercise key={"exercise_" + i}>{exercise.owner}</CustomExercise>
        }
        return <li></li>
      })
    }
    if(list.length === 0 || (list.length && list[list.length - 1].owner !== "")){
      exerciseList.push(<AddExercise key="add_exercise"/>)
    }
    return exerciseList
  }, [list])

  return (
    <List length={exercises.length}>
      {exercises}
    </List>
  )
}

const ListItemStyles = `
  width: 80%;
  height: 10vh;
  border-radius: 1rem;
  color: white;
`

const CustomExercise = styled.div`
  ${ListItemStyles}
  background-color: #999
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

//EXERCISE LIST ITEMS

const StyledBlankExercise = styled.div`
  ${ListItemStyles}
  display: grid;
  grid-template-columns: 4fr 1fr;
`

const ExerciseForm = styled.form`
  width: 100%;
`

const ExerciseSearch = styled.input`
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  height: 90%;
  width: 100%;
`

const CreateCustom = styled.button`
  background-color: #DDD;
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;
`

export const BlankExercise: React.FC = () => {
  const [{}, dispatch] = useSessionContext()
  const [type, createExercise] = useSessionButton("createCustomExercise")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const noWhitespace = search.trim()

    if(noWhitespace.length === 0){
      dispatch(changeMainButton("ADD_EXERCISE"))
    } else {
      dispatch(changeMainButton("ADD_EXERCISE"))
    }
  }, [search])

  return(
    <StyledBlankExercise>
      <ExerciseForm>
        <ExerciseSearch 
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </ExerciseForm>
      <CreateCustom onClick={createExercise}>
        Custom
      </CreateCustom>
    </StyledBlankExercise>
  )
}

export default ExerciseList

//EXERCISE LIST ITEMS END
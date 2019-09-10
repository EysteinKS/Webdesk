import React, { useState, useEffect } from 'react'
import { useSessionContext } from '../../context'
import useSessionButton from '../../hooks/useSessionButton'
import { changeMainButton } from '../../actions/buttons'
import styled from 'styled-components'
import { ListItemStyles } from './styles'

const BlankExercise: React.FC = () => {
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

export default BlankExercise
import React from 'react'
import styled from 'styled-components';
import { changeMainButton } from "../actions/buttons"
import { useSessionContext } from '../context';
import Footer from '../components/Footer';
import MainButton from '../components/MainButton';

const Section = styled.section`
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr)
`

const GridItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  place-items: center;
  place-content: center;
  box-sizing: border-box;
  ${(props: {color: string, selected: boolean}) => `
      background-color: ${props.color}${(props.selected) ? "a" : "6"}
      ${(props.selected) ? "border: 4px solid #FFF8" : ""}`
    }
`

const NewSession = () => {
  const [{}, dispatch] = useSessionContext()
  const [selected, setSelected] = React.useState("blank")

  React.useEffect(() => {
    switch(selected){
      case "browse":
        dispatch(changeMainButton("OPEN_BROWSE"))
        break;
      case "featured":
        dispatch(changeMainButton("OPEN_SESSION"))
        break;
      case "blank":
        dispatch(changeMainButton("OPEN_SESSION"))
        break;
    }
  }, [selected])

  return (
    <>
    <Section>
      <GridItem 
        color="#663" 
        selected={(selected === "browse")} 
        onClick={() => setSelected("browse")}
      >Browse</GridItem>
      <GridItem 
        color="#633" 
        selected={(selected === "featured")}
        onClick={() => setSelected("featured")}
      >Featured</GridItem>
      <GridItem 
        color="#336" 
        selected={(selected === "blank")}
        onClick={() => setSelected("blank")}
      >Create new</GridItem>
    </Section>
    <Footer/>
    </>
  )
}

export default NewSession
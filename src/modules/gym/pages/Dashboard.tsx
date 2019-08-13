import React from 'react'
import styled from 'styled-components';
import Footer from '../components/Footer';
import MainButton from '../components/MainButton';

const StyledDashboard = styled.section`
  height: 90vh;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, 1fr)
`

const StyledSummary = styled.div`
  background-color: gray;
  height: 100%;
  width: 100%;
`

const StyledFeatured = styled.div`
  background-color: lightgray;
  height: 100%;
  width: 100%;
`

const Dashboard = () => {
  return (
    <>
    <StyledDashboard>
      <StyledSummary>

      </StyledSummary>
      <StyledFeatured>

      </StyledFeatured>
    </StyledDashboard>
    <Footer/>
    </>
  )
}

export default Dashboard
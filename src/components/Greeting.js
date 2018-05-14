import React from 'react'
import styled from 'styled-components'

import { colors } from './styles.js'

const Greeting = () => {
  return (
    <GridContainer>
    </GridContainer>
  )
}

const GridContainer = styled.aside`
  background: ${colors.lime};
  display: grid;
  height: 1000px;
  grid-template-rows: 50vh 43vh;
  grid-template-columns: auto;
  grid-template-areas:
    "middleA"
    "bottomA";
`

export default Greeting

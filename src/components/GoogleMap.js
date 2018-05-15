import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.js'


class GoogleMap extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <Container>
        google map
      </Container>
    )
  }
}

const Container = styled.div`
  background: ${colors.lime};
  height: 94vw;
  text-align: center;
  line-height: 94vw;
  font-size: 10vw;
`

export default GoogleMap

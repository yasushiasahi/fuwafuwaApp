import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'

import Header from './Header.js'
import Blog from './Blog.js'

import { colors } from './styles.js'

import yasukorori from './../assets/yasukorori.jpg'


class App extends React.Component {
  constructor() {
    super()
    this.state = ({
    })
  }

  render() {
    return (
      <Container>
        <Header/>
        <Yasu
          src={yasukorori}/>
      </Container>
    )
  }
}

const Container = styled.div`
  background-color: ${colors.yellow};
  width: 100vw;
  height: 100vh;
`

const Main = styled.main`
`

const Yasu = styled.img`
  width: 100vw;
`

export default hot(module)(App)


// return (
//       <Container>
//         <Header />
//         <Main>
//           <Blog />
//         </Main>
//       </Container>
//     )

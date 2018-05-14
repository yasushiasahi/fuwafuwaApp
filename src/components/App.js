import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'

import Header from './Header.js'
import Blog from './Blog.js'
import Home from './Home.js'

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
        <Home/>
        <Blog/>
      </Container>
    )
  }
}

const Container = styled.div`
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

import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'

import Header from './Header.js'
import Blog from './Blog.js'
import Home from './Home.js'
import Sidebar from './Sidebar.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = ({
    })
  }

  render() {
    return (
      <Container>
        <Sidebar/>
        <Header/>
        <Blog/>
        <Home/>
      </Container>
    )
  }
}


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
`

export default hot(module)(App)

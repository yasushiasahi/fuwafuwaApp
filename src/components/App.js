import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'

import Header from './Header.js'
import Blog from './Blog.js'
import Home from './Home.js'
import Sidebar from './Sidebar.js'
import Greeting from './Greeting.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = ({
      isSidebarOpen: false
    })
    this.menuClickHandler = this.menuClickHandler.bind(this)
  }

  menuClickHandler () {
    //console.log('click')
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
  }

  render() {
    return (
      <Container>
        <Header
          menuClickHandler={this.menuClickHandler}
          isSidebarOpen={this.state.isSidebarOpen}/>
        <Sidebar
          isSidebarOpen={this.state.isSidebarOpen}/>
        <Greeting/>
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

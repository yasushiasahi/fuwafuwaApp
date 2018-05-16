import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import { sizes } from './styles.js'
import Home from './Home.js'
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import FullSizePicture from './FullSizePicture.js'
import Greeting from './Greeting.js'
import SalonInfo from './SalonInfo.js'
import Menu from './Menu.js'
import Blog from './Blog.js'
import Gallery from './Gallery.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = ({
      isSidebarOpen: false
    })
    this.menuClickHandler = this.menuClickHandler.bind(this)
  }

  menuClickHandler () {
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
        <Space/>
        <Home />
        <Gallery/>
        <Greeting/>
        <SalonInfo/>
        <Menu/>
        <Blog/>
      </Container>
    )
  }
}


const Container = styled.div`
  position: relative;
`

const Space = styled.div`
  height: ${sizes.headerHeight};
`

export default hot(module)(App)

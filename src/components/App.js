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
      isSidebarOpen: false,
      fullSizePicture: null
    })
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.pictureClickHandler = this.pictureClickHandler.bind(this)
    this.closeClickHandler = this.closeClickHandler.bind(this)
  }

  menuClickHandler () {
    this.setState({
      isSidebarOpen: !this.state.isSidebarOpen
    })
  }

  pictureClickHandler (pictureObj) {
    this.setState({
      fullSizePicture: (
        <FullSizePicture
          pictureObj={pictureObj}
          closeClickHandler={this.closeClickHandler}/>
      )
    })
  }

  closeClickHandler () {
    this.setState({
      fullSizePicture: null
    })
  }

  render() {
    return (
      <Container>
        {this.state.fullSizePicture}
        <Header
          menuClickHandler={this.menuClickHandler}
          isSidebarOpen={this.state.isSidebarOpen}/>
        <Sidebar
          isSidebarOpen={this.state.isSidebarOpen}/>
        <Space/>
        <Greeting/>
        <SalonInfo/>
        <Menu/>
        <Blog/>
        <Gallery
          pictureClickHandler={this.pictureClickHandler}/>
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

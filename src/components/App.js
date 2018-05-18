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
import BlogIndex from './BlogIndex.js'
import Gallery from './Gallery.js'
import Footer from './Footer.js'


class App extends React.Component {
  constructor() {
    super()
    this.state = ({
      isSidebarOpen: false,
      mainViewComponent: null,
      fullSizePicture: null
    })
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.pictureClickHandler = this.pictureClickHandler.bind(this)
    this.closeClickHandler = this.closeClickHandler.bind(this)
    this.handleMainView = this.handleMainView.bind(this)
  }

  componentDidMount () {
    this.handleMainView('Home')
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

  handleMainView (componentName) {
    let provMainViewComponent = null
    switch (componentName) {
    case 'Home':
      provMainViewComponent = (
        <Home
          handleMainView={this.handleMainView}/>
      )
      break
    case 'Greeting':
      provMainViewComponent = (<Greeting/>)
      break
    case 'SalonInfo':
      provMainViewComponent = (<SalonInfo/>)
      break
    case 'Menu':
      provMainViewComponent = (<Menu/>)
      break
    case 'Gallery':
      provMainViewComponent = (
        <Gallery
          pictureClickHandler={this.pictureClickHandler}/>
      )
      break
    case 'BlogIndex':
      provMainViewComponent = (<BlogIndex/>)
      break
    }

    this.setState({
      mainViewComponent: provMainViewComponent
    })
  }

  render() {
    const {
      fullSizePicture,
      isSidebarOpen,
      mainViewComponent
    } = this.state

    return (
      <Container>
        {fullSizePicture}
        <Header
          menuClickHandler={this.menuClickHandler}
          isSidebarOpen={isSidebarOpen}/>
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          handleMainView={this.handleMainView}/>
        <Space/>
        <Main>
          {mainViewComponent}
        </Main>
        <Footer
          handleMainView={this.handleMainView}/>
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

const Main = styled.main`
`


export default hot(module)(App)

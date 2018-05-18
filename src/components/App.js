import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import { sizes, colors } from './styles.js'
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
      isSidebarShown: false,
      isHomeShown: false,
      mainViewComponent: null,
      fullSizePicture: null
    })
    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.pictureClickHandler = this.pictureClickHandler.bind(this)
    this.closeClickHandler = this.closeClickHandler.bind(this)
    this.handleMainView = this.handleMainView.bind(this)
    this.toggleHomeShown = this.toggleHomeShown.bind(this)
  }

  componentDidMount () {
    this.handleMainView('Home')
  }

  menuClickHandler () {
    this.setState({
      isSidebarShown: !this.state.isSidebarShown
    })
  }

  toggleHomeShown () {
    this.setState({
      isHomeShown: !this.state.isHomeShown
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

  handleMainView (componentName, isParentSidebar, isParentHome) {
    let provMainViewComponent = null
    switch (componentName) {
    case 'Home':
      this.toggleHomeShown()
      isParentSidebar && this.menuClickHandler()
      return
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
    isParentHome && this.toggleHomeShown()
    isParentSidebar && this.menuClickHandler()
  }

  render() {
    const {
      fullSizePicture,
      isHomeShown,
      isSidebarShown,
      mainViewComponent
    } = this.state

    return (
      <Container>
        {fullSizePicture}
        <Header
          menuClickHandler={this.menuClickHandler}
          isSidebarShown={isSidebarShown}/>
        <Sidebar
          isSidebarShown={isSidebarShown}
          menuClickHandler={this.menuClickHandler}
          handleMainView={this.handleMainView}/>
        <Main>
          <Home
            isHomeShown={isHomeShown}
            handleMainView={this.handleMainView}/>
          {mainViewComponent}
        </Main>
        <Footer
          handleMainView={this.handleMainView}/>
      </Container>
    )
  }
}


const Container = styled.div`
  background-color: ${colors.yellow};
  position: relative;
  min-height: 100vh;
  max-width: 100vw;
  overflow: hidden;
`

const Main = styled.main`
  background-color: ${colors.cream};
  padding: calc(${sizes.headerHeight} + 2.5vw) 2.5vw 2.5vw 2.5vw;
`


export default hot(module)(App)

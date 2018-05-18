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
      mainViewComponentName: '',
      fullSizePicture: null,
      blogInfos: []
    })

    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.pictureClickHandler = this.pictureClickHandler.bind(this)
    this.closeClickHandler = this.closeClickHandler.bind(this)
    this.toggleHomeShown = this.toggleHomeShown.bind(this)
    this.getExciteBlogRssFeed = this.getExciteBlogRssFeed.bind(this)
    this.toggleBlogBoxOpen = this.toggleBlogBoxOpen.bind(this)
    this.provideMainView = this.provideMainView.bind(this)
    this.switchMainView = this.switchMainView.bind(this)
    this.handleHomeLinkClick = this.handleHomeLinkClick.bind(this)
  }

  componentDidMount () {
    this.getExciteBlogRssFeed()
    this.toggleHomeShown()
  }

  getExciteBlogRssFeed () {
    const url = `https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cdate%2Clink%2Cdescription%20from%20rss%20where%20url%3D'https%3A%2F%2Ffuwafuwayo.exblog.jp%2Findex.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        const provBlogInfos = resJson.query.results.item.map((obj, index) => {
          obj.id = index
          obj.isOpen = (index === 5) ? true : false
          return obj
        })
        this.setState({
          blogInfos: provBlogInfos
        })
      })
      .catch(error => {
        console.log(`エラー:${error}`);
      })
  }

  handleHomeLinkClick (isParentSidebar) {
    isParentSidebar && this.menuClickHandler()
    this.toggleHomeShown()
    // this.setState({
    //   mainViewComponentName: 'Home'
    // })
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

  toggleBlogBoxOpen (id) {
    const provBlogInfos = this.state.blogInfos.map(blogInfo => {
      const copyblogInfo = Object.assign({}, blogInfo)
      if (copyblogInfo.id === id) copyblogInfo.isOpen = !copyblogInfo.isOpen
      return copyblogInfo
    })
    this.setState({
      blogInfos: provBlogInfos
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

  switchMainView (componentName, isParentSidebar, isParentHome) {
    this.setState({
      mainViewComponentName: componentName
    })
    isParentHome && this.toggleHomeShown()
    isParentSidebar && this.menuClickHandler()
  }

  provideMainView (componentName) {
    const { blogInfos } = this.state
    const {
      pictureClickHandler,
      toggleBlogBoxOpen
    } = this
    let provMainViewComponent = null

    switch (componentName) {
    case 'Home':
      provMainViewComponent = null
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
          pictureClickHandler={pictureClickHandler}/>
      )
      break
    case 'BlogIndex':
      provMainViewComponent = (
        <BlogIndex
          toggleBlogBoxOpen={toggleBlogBoxOpen}
          blogInfos={blogInfos}/>
      )
      break
    default:
      provMainViewComponent = null
    }

    return provMainViewComponent
  }

  render() {
    const {
      fullSizePicture,
      isHomeShown,
      isSidebarShown,
    } = this.state
    const {
      handleHomeLinkClick,
      switchMainView,
      menuClickHandler
    } = this

    return (
      <Container>
        {fullSizePicture}
        <Header
          menuClickHandler={menuClickHandler}
          isSidebarShown={isSidebarShown}/>
        <Sidebar
          isSidebarShown={isSidebarShown}
          handleHomeLinkClick={handleHomeLinkClick}
          menuClickHandler={menuClickHandler}
          switchMainView={switchMainView}/>
        <Main>
          <Home
            isHomeShown={isHomeShown}
            switchMainView={switchMainView}/>
          {this.provideMainView(this.state.mainViewComponentName)}
        </Main>
        <Footer
          handleHomeLinkClick={handleHomeLinkClick}
          switchMainView={switchMainView}/>
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

import React from 'react'
import styled from 'styled-components'
import { colors, sizes } from './styles.js'
import Home from './Home.js'
import Greeting from './Greeting.js'
import SalonInfo from './SalonInfo.js'
import Menu from './Menu.js'
import BlogIndex from './BlogIndex.js'
import Gallery from './Gallery.js'

const Main = ({
  balloonText,
  pictureClickHandler,
  blogInfos,
  toggleBlogBoxOpen,
  mainViewComponentName
}) => {
  const provideMainView = componentName => {
    switch (componentName) {
      case 'Home':
        return <Home balloonText={balloonText} />
      case 'Greeting':
        return <Greeting />
      case 'SalonInfo':
        return <SalonInfo />
      case 'Menu':
        return <Menu />
      case 'Gallery':
        return <Gallery pictureClickHandler={pictureClickHandler} />
      case 'BlogIndex':
        return <BlogIndex toggleBlogBoxOpen={toggleBlogBoxOpen} blogInfos={blogInfos} />
      default:
        return null
    }
  }

  return <MainAria>{provideMainView(mainViewComponentName)}</MainAria>
}

const MainAria = styled.main`
  background-color: ${colors.cream};
  padding: calc(${sizes.headerHeight} + 2.5vw) 2.5vw 2.5vw 2.5vw;
`

export default Main

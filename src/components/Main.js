import React from 'react'
import styled from 'styled-components'
import { colors, sizes } from './styles.js'
import Home from './Home.js'
import Greeting from './Greeting.js'
import SalonInfo from './SalonInfo.js'
import Menu from './Menu.js'
import BlogIndex from './BlogIndex.js'
import Gallery from './Gallery.js'
import AdminLogIn from './AdminLogIn.js'

const Main = ({
  mainViewComponentName,
  errorMessage,
  passToHome,
  passToGallery,
  passToBlogIndex,
  passToAdminLogIn
}) => {
  const provideMainView = componentName => {
    switch (componentName) {
      case 'Home':
        return <Home passToHome={passToHome} />
      case 'Greeting':
        return <Greeting />
      case 'SalonInfo':
        return <SalonInfo />
      case 'Menu':
        return <Menu />
      case 'Gallery':
        return <Gallery passToGallery={passToGallery} />
      case 'BlogIndex':
        return <BlogIndex passToBlogIndex={passToBlogIndex} />
      case 'AdminLogIn':
        return <AdminLogIn passToAdminLogIn={passToAdminLogIn} />
      default:
        return null
    }
  }

  return (
    <MainAria>
      {errorMessage && <ErrMsg>{errorMessage}</ErrMsg>}
      {provideMainView(mainViewComponentName)}
    </MainAria>
  )
}

const MainAria = styled.main`
  background-color: ${colors.cream};
  padding: calc(${sizes.headerHeight} + 2.5vw) 2.5vw 2.5vw 2.5vw;
`

const ErrMsg = styled.p`
  color: red;
  padding: 1vw;
  margin-bottom: 3vw;
  border: 1px solid red;
`

export default Main

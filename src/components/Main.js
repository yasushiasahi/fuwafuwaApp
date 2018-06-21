import React from 'react'
import styled from 'styled-components'
import { media, sizes } from './styles.js'
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
    <Wrapper>
      <MainAria>
        {errorMessage && <ErrMsg>{errorMessage}</ErrMsg>}
        {provideMainView(mainViewComponentName)}
      </MainAria>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: Main;
  min-height: calc(100vh - ${sizes.mobileHeaderHeight} - ${sizes.mobileFooterHeight});

  ${media.desktop`
    width: ${sizes.desktopMainWidth};
    min-height: calc(100vh - ${sizes.desktopFooterHeight});
    justify-self: center;
  `};
`

const MainAria = styled.main`
  padding: 0 4vw;

  ${media.desktop`
    padding: 0;
  `};
`

const ErrMsg = styled.p`
  background-color: red;
  color: white;
  font-weight: bold;
  padding: 1vw;
  margin-bottom: 3vw;

  ${media.desktop`
    margin: 20px 0;
  `};
`

export default Main

import React from 'react'
import styled from 'styled-components'
import { media } from './styles.js'
import Home from './Home.js'
import Greeting from './Greeting.js'
import SalonInfo from './SalonInfo.js'
import Menu from './Menu.js'
import BlogIndex from './BlogIndex.js'
import Gallery from './Gallery.js'
import AdminLogIn from './AdminLogIn.js'
import Footer from './Footer.js'

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
      <Footer />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: Main;

  ${media.desktop`
    width: 740px;
    justify-self: center;
  `};
`

const MainAria = styled.main`
  padding: 4vw;

  ${media.desktop`
    padding: 0
  `};
`

const ErrMsg = styled.p`
  color: red;
  padding: 1vw;
  margin-bottom: 3vw;
  border: 1px solid red;
`

export default Main

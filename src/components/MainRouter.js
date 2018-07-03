import React from 'react'
import styled from 'styled-components'
import common from './common/commonIndex'
const {
  styles: { media, sizes }
} = common

const MainRouter = ({ children }) => {
  const mainComponent = children.find(c => c.key === (location.hash.slice(1) || 'Home'))

  return (
    <Wrapper>
      <MainAria>{mainComponent}</MainAria>
    </Wrapper>
  )
}

const Wrapper = styled.main`
  grid-area: Main;
  min-height: calc(100vh - ${sizes.mobileHeaderHeight} - ${sizes.mobileFooterHeight});

  ${media.desktop`
    width: ${sizes.desktopMainWidth};
    min-height: calc(100vh - ${sizes.desktopFooterHeight});
    justify-self: center;
  `};
`

const MainAria = styled.div`
  padding: 0 4vw;

  ${media.desktop`
    padding: 0;
  `};
`

export default MainRouter

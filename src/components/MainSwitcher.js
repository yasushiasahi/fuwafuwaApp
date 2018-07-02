import React from 'react'
import styled from 'styled-components'
import common from './common/commonIndex'
const {
  styles: { media, sizes }
} = common

const MainSwitcher = ({ children, mainComponentName }) => {
  const mainComponent = children.find(c => c.key === (mainComponentName || 'Home'))

  return (
    <Wrapper>
      <MainAria>{mainComponent}</MainAria>
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

export default MainSwitcher

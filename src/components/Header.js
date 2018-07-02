import React from 'react'
import styled from 'styled-components'
import common from './common/commonIndex'
const {
  styles: { media, colors, sizes, properties }
} = common
import images from '../images/imageIndex'
const {
  assets: { logo, pict_close, pict_hamburger }
} = images

const Header = ({ passToHeader: { isSidebarShown, toggleSidebarShown } }) => {
  return (
    <Wrapper>
      <GridContainer>
        <Logo src={logo} alt="ロゴ" />
        <Pict
          src={isSidebarShown ? pict_close : pict_hamburger}
          alt="メニューアイコン"
          onClick={() => toggleSidebarShown()}
        />
      </GridContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: Header;
  position: relative;
  background: ${colors.yellow};
`
const GridContainer = styled.header`
  position: fixed;
  width: 100%;
  height: ${sizes.mobileHeaderHeight};
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5% 50% 35% 10%;
  grid-template-areas: '. Logo . Pict';
  align-items: center;

  box-shadow: ${properties.boxShadow()};
  background: ${colors.yellow};

  ${media.desktop`
    width: ${sizes.desktopSideberWidth};
    height: ${sizes.desktopHeaderHeight};
    grid-template-columns: 90%;
    grid-template-areas: 'Logo';
    justify-content: center;
  `};
`

const Logo = styled.img`
  grid-area: Logo;
  width: 100%;
`

const Pict = styled.img`
  grid-area: Pict;
  height: 50%;
  cursor: pointer;

  ${media.desktop`
    display: none;
  `};
`

export default Header

import React from 'react'
import styled from 'styled-components'
import { media, colors, sizes, properties } from './styles.js'
import logo from './../images/assets/logo.svg'
import hamburgerMenu from './../images/assets/hamburger_menu.svg'
import closeMenu from './../images/assets/close_menu.svg'

const Header = ({ menuClickHandler, isSidebarShown }) => {
  return (
    <Wrapper>
      <GridContainer>
        <Logo src={logo} alt="ロゴ" />
        <Pict
          src={isSidebarShown ? closeMenu : hamburgerMenu}
          alt="メニューアイコン"
          onClick={() => menuClickHandler()}
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

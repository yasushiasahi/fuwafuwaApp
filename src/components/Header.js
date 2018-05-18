import React from 'react'
import styled from 'styled-components'
import { colors, sizes, properties } from './styles.js'
import logo from './../images/assets/logo.svg'
import hamburgerMenu from './../images/assets/hamburger_menu.svg'
import closeMenu from './../images/assets/close_menu.svg'


const Header = ({
  menuClickHandler,
  isSidebarOpen
}) => (
  <GridContainer>
    <Logo
      src={logo}
      alt='ロゴ'/>
    <Pict
      src={isSidebarOpen ? closeMenu : hamburgerMenu}
      alt='メニューアイコン'
      onClick={() => menuClickHandler()}/>
  </GridContainer>
)


const GridContainer = styled.header`
  background: ${colors.yellow};
  display: grid;
  grid-template-rows: ${sizes.headerHeight};
  grid-template-columns: 5vw 85vw 10vw;
  grid-template-areas:
    ". logo pict";
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  box-shadow: ${properties.boxShadow()};
`

const Logo = styled.img`
  grid-area: logo;
  width: 50vw;
`

const Pict = styled.img`
  grid-area: pict;
  width: 5vw;
  cursor: pointer;
`



export default Header

import React from 'react'
import styled from 'styled-components'
import { colors, sizes } from './styles.js'
import logo from './../images/assets/logo.svg'
import hamburgerMenu from './../images/assets/hamburger_menu.svg'
import closeMenu from './../images/assets/close_menu.svg'


const Header = props => {
  const {
    menuClickHandler,
    isSidebarOpen
  } = props

  return (
    <GridContainer>
      <CenterA
        src={logo}
        alt='ロゴ'/>
      <RightA
        src={isSidebarOpen ? closeMenu : hamburgerMenu}
        alt='メニューアイコン'
        onClick={() => menuClickHandler()}/>
    </GridContainer>
  )
}


const GridContainer = styled.header`
  background: ${colors.yellow};
  height: ${sizes.headerHeight};
  display: grid;
  grid-template-rows: 25% 50% 25%;
  grid-template-columns: 20vw 60vw 20vw;
  grid-template-areas:
    ". ....... ......"
    ". centerA rightA"
    ". ....... ......";
  justify-items: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
`

const CenterA = styled.img`
  grid-area: centerA;
  width: 100%;
`

const RightA = styled.img`
  grid-area: rightA;
  padding-top: 0.5vh;
  height: 80%;
`



export default Header

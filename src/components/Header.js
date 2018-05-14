import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.js'
import logo from './../assets/logo.svg'
import hamburgerMenu from './../assets/hamburger_menu.svg'
import closeMenu from './../assets/close_menu.svg'


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
  display: grid;
  grid-template-rows: 2vh 3vh 2vh;
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
  height: 70%;
`



export default Header

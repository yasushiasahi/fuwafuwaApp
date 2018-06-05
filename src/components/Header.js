import React from 'react'
import styled from 'styled-components'
import { colors, sizes, properties } from './styles.js'
import { getCookie } from './helpers.js'
import logo from './../images/assets/logo.svg'
import hamburgerMenu from './../images/assets/hamburger_menu.svg'
import closeMenu from './../images/assets/close_menu.svg'

const Header = ({ isLogIn, menuClickHandler, isSidebarShown }) => {
  return (
    <GridContainer isLogIn={isLogIn}>
      <Logo src={logo} alt="ロゴ" />
      <Status>{isLogIn && <span>{getCookie('userName')}でログイン中</span>}</Status>
      <Pict
        src={isSidebarShown ? closeMenu : hamburgerMenu}
        alt="メニューアイコン"
        onClick={() => menuClickHandler()}
      />
    </GridContainer>
  )
}

const GridContainer = styled.header`
  background: ${props => (props.isLogIn ? colors.blue : colors.yellow)};
  display: grid;
  grid-template-rows: ${sizes.headerHeight};
  grid-template-columns: 5vw 50vw 35vw 10vw;
  grid-template-areas: '. logo Status pict';
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

const Status = styled.div`
  grid-area: Status;
  justify-self: center;

  span {
    font-size: 3vw;
    color: ${colors.cream};
  }
`

const Pict = styled.img`
  grid-area: pict;
  width: 5vw;
  cursor: pointer;
`

export default Header

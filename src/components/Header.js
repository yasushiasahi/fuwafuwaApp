import React from 'react'
import styled from 'styled-components'
import { media, colors, sizes, properties } from './styles.js'
import { getCookie } from './helpers.js'
import logo from './../images/assets/logo.svg'
import hamburgerMenu from './../images/assets/hamburger_menu.svg'
import closeMenu from './../images/assets/close_menu.svg'

const Header = ({ isLogIn, menuClickHandler, isSidebarShown }) => {
  return (
    <Wrapper>
      <GridContainer isLogIn={isLogIn}>
        <Logo src={logo} alt="ロゴ" />
        <Status>{isLogIn && <span>{getCookie('userName')}でログイン中</span>}</Status>
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
`
const GridContainer = styled.header`
  background: ${props => (props.isLogIn ? colors.blue : colors.yellow)};
  width: 100%;
  height: 10vw;

  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 5% 50% 35% 10%;
  grid-template-areas: '. logo Status pict';
  align-items: center;

  position: fixed;

  box-shadow: ${properties.boxShadow()};

  ${media.desktop`
    height: 60px;
  `};
`
// z-index: 10;

const Logo = styled.img`
  grid-area: logo;
  height: 50%;
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
  height: 50%;
  cursor: pointer;
`

export default Header

import React from 'react'
import styled from 'styled-components'
import MainViewSwicther from './MainViewSwitcher.js'
import { colors } from './styles.js'
import logo from './../images/assets/logo.svg'


const Footer = ({ handleMainView }) => (
  <GridContainer>
    <Logo
      src={logo}
      alt='ロゴ'/>
    <Links>
      <MainViewSwicther
        handleMainView={handleMainView}
        isColumn={true}/>
    </Links>
    <Copyright>Copyrights © fuwafuwa Hair Salon All Rights Reserved.</Copyright>
  </GridContainer>
)


const GridContainer = styled.header`
  background-color: ${colors.yellow};
  display: grid;
  grid-template-rows: 8vw 10vw 9vw;
  grid-template-columns: auto;
  grid-template-areas:
    "logo"
    "links"
    "copyright";
  box-sizing: border-box;
`

const Logo = styled.img`
  grid-area: logo;
  width: 50vw;
  justify-self: center;
  align-self: end;
`

const Links = styled.div`
  grid-area: links;
  font-size: 3vw;
`

const Copyright = styled.div`
  grid-area: copyright;
  text-align: center;
  font-size: 2.5vw;
  line-height: 9vw;
`

export default Footer

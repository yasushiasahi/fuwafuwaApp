import React from 'react'
import styled from 'styled-components'
import MainViewSwicther from './MainViewSwitcher.js'
import { media } from './styles.js'
import logo from './../images/assets/logo.svg'

const Footer = () => (
  <Wrapper>
    <GridContainer>
      <Logo>
        <img src={logo} alt="ロゴ" />
      </Logo>
      <Links>
        <MainViewSwicther />
      </Links>
      <Copyright>
        <p>Copyrights © fuwafuwa Hair Salon All Rights Reserved.</p>
      </Copyright>
    </GridContainer>
  </Wrapper>
)

const Wrapper = styled.div`
  grid-area: Footer;
`

const GridContainer = styled.footer`
  display: grid;
  grid-template-rows: 8vw 10vw 9vw;
  grid-template-columns: auto;
  grid-template-areas:
    'logo'
    'links'
    'copyright';
  box-sizing: border-box;

  ${media.desktop`
    grid-template-rows: 100px 70px 50px;
  `};
`

const Logo = styled.div`
  grid-area: logo;
  justify-self: center;
  align-self: end;
  width: 50%;

  img {
    width: 100%;
  }
`

const Links = styled.div`
  grid-area: links;
  align-self: end;

  ul {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;

    li {
      margin-bottom: 0;
      img {
        height: 5vw;
      }

      ${media.desktop`
        margin-bottom: 15px;
        img {
          height: 30px;
        }
      `};
    }
  }
`

const Copyright = styled.div`
  grid-area: copyright;
  justify-self: center;
  align-self: center;

  p {
    font-size: 2.5vw;

    ${media.desktop`
      font-size: 15px;
    `};
  }
`

export default Footer

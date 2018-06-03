import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.js'
import MainViewSwicther from './MainViewSwitcher.js'
import BalloonSvg from './BalloonSvg.js'
import yasukorori from './../images/assets/yasukorori.png'
import logo from './../images/assets/logo.svg'
import youkoso from './../images/assets/youkoso.svg'
import he from './../images/assets/he.svg'

const Home = ({ balloonText }) => (
  <GridContainer>
    <TopA>
      <Logo src={youkoso} />
      <br />
      <Logo src={logo} />
      <Logo src={he} />
    </TopA>
    <RightA src={yasukorori} alt="店主似顔絵" />
    <LeftA>
      <MainViewSwicther />
    </LeftA>
    <BalloonAria>
      <BalloonSvg balloonText={balloonText} />
    </BalloonAria>
  </GridContainer>
)

const GridContainer = styled.div`
  background: ${colors.yellow};
  display: grid;
  grid-template-rows: 30vh 30vh 40vh;
  grid-template-columns: 5vw 45vw 50vw;
  grid-template-areas:
    '. topA topA'
    '. leftA ...'
    '. balloon rightA';
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
`

const BalloonAria = styled.div`
  grid-area: balloon;
`

const TopA = styled.h1`
  grid-area: topA;
  font-size: 9vw;
  align-self: center;
  line-height: 12vw;
`

const Logo = styled.img`
  height: 7.3vw;
  margin-right: 3vw;
`

const LeftA = styled.ul`
  grid-area: leftA;
  font-size: 5vw;
  img {
    height: 7vw;
  }
`

const RightA = styled.img`
  grid-area: rightA;
  height: 70vh;
  justify-self: end;
  align-self: end;
`

export default Home

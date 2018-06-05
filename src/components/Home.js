import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.js'
import MainViewSwicther from './MainViewSwitcher.js'
import BalloonSvg from './BalloonSvg.js'
import yasukorori from './../images/assets/yasukorori.png'
import logo from './../images/assets/logo.svg'
import youkoso from './../images/assets/youkoso.svg'
import he from './../images/assets/he.svg'

const Home = ({ passToHome: { balloonText } }) => (
  <GridContainer>
    <WelcomeMsg>
      <img src={youkoso} />
      <br />
      <img src={logo} />
      <img src={he} />
    </WelcomeMsg>
    <Picture>
      <img src={yasukorori} alt="店主似顔絵" />
    </Picture>
    <Links>
      <MainViewSwicther />
    </Links>
    <Balloon>
      <BalloonSvg balloonText={balloonText} />
    </Balloon>
  </GridContainer>
)

const GridContainer = styled.div`
  background: ${colors.yellow};
  display: grid;
  grid-template-rows: 30vh 40vh 30vh;
  grid-template-columns: 5vw 45vw 50vw;
  grid-template-areas:
    '. WelcomeMsg WelcomeMsg'
    '. Links      Picture'
    '. Balloon    Picture';
  position: absolute;
  z-index: 30;
  top: 0;
  left: 0;
`

const Balloon = styled.div`
  grid-area: Balloon;
`

const WelcomeMsg = styled.h1`
  grid-area: WelcomeMsg;
  align-self: center;
  line-height: 12vw;

  img {
    height: 7.3vw;
    margin-right: 3vw;
  }
`

const Picture = styled.div`
  grid-area: Picture;
  justify-self: end;

  img {
    height: 100%;
  }
`

const Links = styled.div`
  grid-area: Links;

  li {
    margin-bottom: 4vw;
    img {
      height: 7vw;
    }
  }
`

export default Home

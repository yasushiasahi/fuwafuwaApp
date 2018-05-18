import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.js'
import MainViewSwicther from './MainViewSwitcher.js'
import yasukorori from './../images/assets/yasukorori.png'
import logo from './../images/assets/logo.svg'


const Home = ({
  handleHomeLinkClick,
  switchMainView,
  isHomeShown
}) => (
  <GridContainer
    isHomeShown={isHomeShown}>
    <TopA>
      ようこそ<br/>
      <Logo src={logo} />へ
    </TopA>
    <RightA
      src={yasukorori} alt='店主似顔絵'/>
    <LeftA>
      <MainViewSwicther
        isParentHome={true}
        handleHomeLinkClick={handleHomeLinkClick}
        switchMainView={switchMainView}/>
    </LeftA>
  </GridContainer>
)


const GridContainer = styled.div`
  background: ${colors.yellow};
  display: grid;
  grid-template-rows: 30vh 70vh;
  grid-template-columns: 5vw 45vw 50vw;
  grid-template-areas:
    ". topA topA"
    ". leftA rightA";
  position: absolute;
  z-index: 30;
  top: 0;
  left: ${props => props.isHomeShown ? '0' : '100vw'};
  transition: all .5s;
`

const TopA = styled.h1`
  grid-area: topA;
  font-size: 9vw;
  align-self: center;
`

const Logo = styled.img`
  width: 75vw;
  margin-right: 5vw;
`

const LeftA = styled.ul`
  grid-area: leftA;
  font-size: 5vw;
`

const RightA = styled.img`
  grid-area: rightA;
  height: 70vh;
  justify-self: end;
  align-self: end;
`

export default Home

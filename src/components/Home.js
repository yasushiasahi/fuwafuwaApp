import React from 'react'
import styled from 'styled-components'

import { colors } from './styles.js'

import yasukorori from './../assets/yasukorori.png'
import logo from './../assets/logo.svg'

const Home = () => {
  return (
    <GridContainer>
      <TopA>
        ようこそ<br/>
        <Logo src={logo} />へ
      </TopA>
      <LeftA>
        <Li>ホーム</Li>
        <Li>ご挨拶</Li>
        <Li>お店情報</Li>
        <Li>メニュー</Li>
        <Li>ブログ</Li>
        <Li>画廊</Li>
      </LeftA>
      <RightA
        src={yasukorori} alt='店主似顔絵'/>
    </GridContainer>
  )
}

const GridContainer = styled.div`
  background: ${colors.yellow};
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 30vh 70vh;
  grid-template-columns: 5vw 45vw 50vw;
  grid-template-areas:
    ". topA topA"
    ". leftA rightA";
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
  list-style: none;
`

const Li = styled.li`
  font-size: 5vw;
`

const RightA = styled.img`
  grid-area: rightA;
  height: 70vh;
  justify-self: end;
  align-self: end;
`

export default Home

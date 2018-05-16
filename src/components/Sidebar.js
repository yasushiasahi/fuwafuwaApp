import React from 'react'
import styled from 'styled-components'
import { colors, sizes } from './styles.js'
import yasukorori from './../images/assets/yasukorori.png'


const Sidebar = props => {
  const { isSidebarOpen } = props

  return (
    <GridContainer
      isSidebarOpen={isSidebarOpen}>
      <TopA>
        <Li>ホーム</Li>
        <Li>ご挨拶</Li>
        <Li>お店情報</Li>
        <Li>メニュー</Li>
        <Li>ブログ</Li>
        <Li>画廊</Li>
      </TopA>
      <BottomA
        src={yasukorori}/>
    </GridContainer>
  )
}


const GridContainer = styled.aside`
  background: ${colors.yellow};
  display: grid;
  width: 40vw;
  grid-template-rows: 50vh 43vh;
  grid-template-columns: auto;
  grid-template-areas:
    "middleA"
    "bottomA";
  justify-items: center;
  position: fixed;
  top: ${sizes.headerHeight};
  left: ${props => (props.isSidebarOpen ? '60vw' : '100vw')};
  z-index: 10;
  transition: all .5s;
`

const TopA = styled.ul`
  grid-area: middleA;
  list-style: none;
  align-self: center;
`

const Li = styled.li`
  font-size: 5vw;
`

const BottomA = styled.img`
  grid-area: bottomA;
  width: 100%;
  align-self: end;
`

export default Sidebar

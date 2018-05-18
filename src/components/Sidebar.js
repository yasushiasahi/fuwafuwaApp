import React from 'react'
import styled from 'styled-components'
import MainViewSwitcher from './MainViewSwitcher.js'
import { colors, sizes } from './styles.js'
import yasukorori from './../images/assets/yasukorori.png'


const Sidebar = ({
  isSidebarShown,
  handleHomeLinkClick,
  switchMainView
}) => (
  <GridContainer
    isSidebarShown={isSidebarShown}>
    <TopA>
      <MainViewSwitcher
        isParentSidebar={true}
        handleHomeLinkClick={handleHomeLinkClick}
        switchMainView={switchMainView}/>
    </TopA>
    <BottomA
      src={yasukorori}/>
  </GridContainer>
)


const GridContainer = styled.aside`
  background: ${colors.yellow};
  display: grid;
  width: 40vw;
  grid-template-rows: 50vh calc(50Vh - ${sizes.headerHeight} + 1px);
  grid-template-columns: auto;
  grid-template-areas:
    "middleA"
    "bottomA";
  justify-items: center;
  position: fixed;
  top: calc(${sizes.headerHeight} - 1px);
  left: ${props => (props.isSidebarShown ? '60vw' : '100vw')};
  z-index: 10;
  transition: all .5s;
  box-shadow: 0 .6vw .6vw 0 rgba(0,0,0,.6);
`

const TopA = styled.div`
  grid-area: middleA;
  align-self: center;
  font-size: 5vw;
`

const BottomA = styled.img`
  grid-area: bottomA;
  width: 100%;
  align-self: end;
`

export default Sidebar

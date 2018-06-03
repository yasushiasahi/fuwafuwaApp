import React from 'react'
import styled from 'styled-components'
import MainViewSwitcher from './MainViewSwitcher.js'
import { colors, sizes } from './styles.js'
import yasukorori from './../images/assets/yasukorori.png'

const Sidebar = ({ isSidebarShown }) => (
  <GridContainer isSidebarShown={isSidebarShown}>
    <Links>
      <MainViewSwitcher />
    </Links>
    <Picture>
      <img src={yasukorori} alt="店主似顔絵" />
    </Picture>
  </GridContainer>
)

const GridContainer = styled.aside`
  background: ${colors.yellow};
  display: grid;
  width: 40vw;
  grid-template-rows: 50vh calc(50vh - ${sizes.headerHeight} + 1px);
  grid-template-columns: auto;
  grid-template-areas:
    'Links'
    'Picture';
  justify-items: center;
  position: fixed;
  top: calc(${sizes.headerHeight} - 1px);
  left: ${props => (props.isSidebarShown ? '60vw' : '100vw')};
  z-index: 10;
  transition: all 0.5s;
  box-shadow: 0 0.6vw 0.6vw 0 rgba(0, 0, 0, 0.6);
`

const Picture = styled.div`
  grid-area: Picture;
  align-self: end;

  img {
    width: 100%;
  }
`

const Links = styled.div`
  grid-area: Links;
  align-self: center;
  font-size: 5vw;

  li {
    margin-bottom: 4vw;
    img {
      height: 7vw;
    }
  }
`

export default Sidebar

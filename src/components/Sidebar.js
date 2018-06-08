import React from 'react'
import styled from 'styled-components'
import MainViewSwitcher from './MainViewSwitcher.js'
import { media, colors, sizes } from './styles.js'
import yasukorori from './../images/assets/yasukorori.png'

const Sidebar = ({ isSidebarShown }) => (
  <Wrapper>
    <GridContainer isSidebarShown={isSidebarShown}>
      <Links>
        <MainViewSwitcher />
      </Links>
      <Picture>
        <img src={yasukorori} alt="店主似顔絵" />
      </Picture>
    </GridContainer>
  </Wrapper>
)

const Wrapper = styled.div`
  grid-area: Sidebar;
  position: relative;
`

const GridContainer = styled.aside`
  width: 40vw;
  height: calc(100vh - 10vw);

  display: grid;
  grid-template-rows: 50% 50%;
  grid-template-columns: auto;
  grid-template-areas:
    'Links'
    'Picture';
  justify-items: center;

  position: fixed;
  top: auto;
  left: ${props => (props.isSidebarShown ? '60vw' : '100vw')};

  background: ${colors.yellow};
  transition: all 0.5s;
  box-shadow: 0 0.6vw 0.6vw 0 rgba(0, 0, 0, 0.6);

  ${media.desktop`
    height: calc(100vh - 60px);
    width: 250px;
    left: auto;
  `};
`

// z-index: 10;

const Picture = styled.div`
  grid-area: Picture;
  align-self: end;

  img {
    width: 100%;
    display: block;
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

  ${media.desktop`
    li {
      margin-bottom: 15px;
      img {
        height: 40px;
      }
    }
  `};
`

export default Sidebar

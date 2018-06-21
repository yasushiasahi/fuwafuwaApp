import React from 'react'
import styled from 'styled-components'
import MainViewSwitcher from './MainViewSwitcher.js'
import { getCookie } from './helpers.js'
import { media, colors, sizes, sc } from './styles.js'
import yasukorori from './../images/assets/yasukorori.png'

const logout = changeState => {
  document.cookie = 'userName=; max-age=0'
  document.cookie = 'token=; max-age=0'
  changeState('isLogIn', false)
}

const Sidebar = ({ isSidebarShown, isLogIn, changeState }) => (
  <Wrapper>
    <GridContainer isSidebarShown={isSidebarShown}>
      <Links>
        {isLogIn ? (
          <LoginStatus>
            <p>{getCookie('userName')}</p>
            <LogoutButton onClick={() => logout(changeState)}>ログアウト</LogoutButton>
          </LoginStatus>
        ) : null}
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

  background-color: ${colors.yellow};
  transition: all 0.5s;
  box-shadow: 0 0.6vw 0.6vw 0 rgba(0, 0, 0, 0.6);

  ${media.desktop`
    height: calc(100vh - 60px);
    width: ${sizes.desktopSideberWidth};
    left: auto;
  `};
`

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
    margin-bottom: 3vw;
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

const LoginStatus = styled.div`
  text-align: center;
  margin: 3vw 0;
  padding: 0 1vw 2vw 1vw;
  background-color: ${colors.skyblue};
  border-radius: 2vw;

  ${media.desktop`
    margin: 1rem 0;
    padding: .5rem .5rem 1rem .5rem ;
    border-radius: .5rem;
    font-size: 2rem;
    line-height: 2rem;
  `};
`

const LogoutButton = sc.Button.extend`
  grid-area: LogoutButton;
  display: inline-block;
  margin: 0;
`

export default Sidebar

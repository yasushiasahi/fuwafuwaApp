import React from 'react'
import styled from 'styled-components'
import common from './common/commonIndex'
const {
  LinkButtons,
  helpers: { getCookie },
  styles: { media, colors, sizes, sc }
} = common
import images from '../images/imageIndex'
const {
  assets: { yasukorori }
} = images

const Sidebar = ({ passToSidebar: { isSidebarShown, isLogin, handleLogout } }) => (
  <Wrapper>
    <GridContainer isSidebarShown={isSidebarShown}>
      <Links>
        {isLogin ? (
          <LoginStatus>
            <p>ユーザー名</p>
            <LogoutButton onClick={() => handleLogout()}>ログアウト</LogoutButton>
          </LoginStatus>
        ) : null}
        <LinkButtons />
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

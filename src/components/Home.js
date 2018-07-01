import React from 'react'
import styled from 'styled-components'
import { media, colors, sc } from './styles.js'
import MainViewSwicther from './MainViewSwitcher.js'
import BalloonSvg from './BalloonSvg.js'
import yasukorori from './../images/assets/yasukorori.png'
import logo from './../images/assets/logo.svg'
import youkoso from './../images/assets/youkoso.svg'
import he from './../images/assets/he.svg'
import bg from './../images/assets/home_bg.png'

import { fetchApi, getCookie } from './helpers.js'

const addBalloonText = async (changeState, balloonText) => {
  if (balloonText.length === 0 || balloonText.length > 15) {
    changeState({
      errorMessage: '1~15文字を入力してください'
    })
    return
  }

  const response = await fetchApi('checkToken', {
    userName: getCookie('userName'),
    token: getCookie('token')
  })
  if (!response.status) {
    changeState('errorMessage', response.body)
    return
  }

  const { status, body } = await fetchApi('addBalloonTexts', balloonText)
  if (!status) {
    changeState({
      errorMessage: body
    })
    return
  }

  changeState({
    balloonTexts: body,
    inputTexts: { balloonText: '', userName: '', password: '', title: '', description: '' }
  })
}

const Home = ({
  passToHome: { isLogIn, balloonTexts, balloonText, handleInputsChange, changeStateKAI: cs }
}) => (
    <GridContainer>
      {isLogIn ? (
        <BalloonEdit>
          <p>新しいテキスト</p>
          <sc.Input
            type="text"
            name="balloonText"
            size="30"
            value={balloonText}
            onChange={e => handleInputsChange(e)}
          />
          <sc.Button onClick={() => addBalloonText(cs, balloonText)}>追加</sc.Button>
        </BalloonEdit>
      ) : (
          <WelcomeMsg>
            <img src={youkoso} />
            <br />
            <img src={logo} />
            <img src={he} />
          </WelcomeMsg>
        )}
      <Picture>
        <img src={yasukorori} alt="店主似顔絵" />
      </Picture>
      <Links>
        <MainViewSwicther />
      </Links>
      <Balloon>
        <BalloonSvg balloonTexts={balloonTexts} />
      </Balloon>
    </GridContainer>
  )

const BalloonEdit = styled.div`
  grid-area: WelcomeMsg;
  background-color: ${colors.cream};
`

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

  background-image: url(${bg});

  ${media.desktop`
    width: 100vw;
    grid-template-rows: 30vh 40vh 30vh;
    grid-template-columns: auto 360px 320px auto;
    grid-template-areas:
      '. WelcomeMsg WelcomeMsg .'
      '. Links      Picture    .'
      '. Balloon    Picture    .';
    justify-self: center;
  `};
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

  ${media.desktop`
    line-height: 60px;

    img {
      height: 50px;
      margin-right: 20px;
    }
  `};
`

const Picture = styled.div`
  grid-area: Picture;
  justify-self: end;

  img {
    height: 100%;
    display: block;
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

  ${media.desktop`
    li {
      margin-bottom: 15px;
      img {
        height: 40px;
      }
    }
  `};
`

export default Home

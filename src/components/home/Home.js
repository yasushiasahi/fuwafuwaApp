import React from 'react'
import styled from 'styled-components'
import BalloonSvg from './BalloonSvg.js'
import common from '../common/commonIndex'
const {
  LinkButtons,
  StatusMsg,
  helpers: { fetchApi },
  styles: { media, colors, sc }
} = common
import images from '../../images/imageIndex'
const {
  assets: { yasukorori, logo, youkoso, he, home_bg }
} = images

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: '',
      selectValue: 'x',
      isEditMode: false,
      isFocused: false,
      status: { msg: '', isOk: false }
    }
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleCancelClick = this.handleCancelClick.bind(this)
    this.addBalloonText = this.addBalloonText.bind(this)
    this.updateBalloonText = this.updateBalloonText.bind(this)
    this.removeBalloonText = this.removeBalloonText.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
  }

  handleTextChange(e) {
    this.setState({ textValue: e.target.value })
  }

  handleSelectChange(e) {
    const i = e.target.value
    if (i === 'x') return
    const bt = this.props.pass.balloonTexts[i]
    this.setState({
      textValue: `${bt.top}${bt.middle}${bt.bottom}`,
      selectValue: i,
      isEditMode: true,
      status: { msg: '', isOk: false }
    })
  }

  handleCancelClick() {
    this.setState({
      textValue: '',
      selectValue: 'x',
      isEditMode: false,
      status: { msg: '', isOk: false }
    })
  }

  async addBalloonText() {
    const t = this.state.textValue
    const setBalloonTexts = this.props.pass.setBalloonTexts
    if (t.length === 0 || t.length > 15) {
      this.setState({ status: { msg: '1~15文字で入力してください', isOk: false } })
      return
    }
    const { status, body } = await fetchApi('addBalloonText', t)
    if (!status) {
      this.setState({ status: { msg: body, isOk: false } })
      return
    }
    setBalloonTexts(body)
    this.setState({
      textValue: '',
      status: { msg: 'テキストを追加しました', isOk: true }
    })
  }

  async updateBalloonText() {
    const { textValue: t, selectValue: i } = this.state
    const setBalloonTexts = this.props.pass.setBalloonTexts
    if (t.length === 0 || t.length > 15) {
      this.setState({ status: { msg: '1~15文字で入力してください', isOk: false } })
      return
    }
    const { status, body } = await fetchApi('updateBalloonText', { targetIndex: i, text: t })
    if (!status) {
      this.setState({ status: { msg: body, isOk: false } })
      return
    }
    setBalloonTexts(body)
    this.setState({
      textValue: '',
      selectValue: 'x',
      isEditMode: false,
      status: { msg: 'テキストを更新しました', isOk: true }
    })
  }

  async removeBalloonText() {
    const setBalloonTexts = this.props.pass.setBalloonTexts
    const i = this.state.selectValue
    const { status, body } = await fetchApi('removeBalloonText', i)
    if (!status) {
      this.setState({ status: { msg: body, isOk: false } })
      return
    }
    setBalloonTexts(body)
    this.setState({
      textValue: '',
      selectValue: 'x',
      isEditMode: false,
      status: { msg: 'テキストを削除しました', isOk: true }
    })
  }

  handleFocus(b) {
    this.setState({ isFocused: b })
  }

  divideText(s) {
    const sa = s.split('')
    let so = { top: '', middle: '', bottom: '' }
    for (const i in sa) {
      if (i <= 4) so.top += sa[i]
      if (i >= 5 && i <= 9) so.middle += sa[i]
      if (i >= 10 && i <= 14) so.bottom += sa[i]
    }
    return [so]
  }

  render() {
    const { isLogin, balloonTexts } = this.props.pass
    const { textValue, selectValue, isEditMode, isFocused, status } = this.state
    const {
      handleTextChange,
      handleSelectChange,
      handleCancelClick,
      addBalloonText,
      updateBalloonText,
      removeBalloonText,
      handleFocus,
      divideText
    } = this

    let options = [
      <option key="x" value="x">
        編集するテキストを選択
      </option>
    ]
    for (const [i, bt] of balloonTexts.entries()) {
      options.push(<option key={i} value={i}>{`${bt.top}${bt.middle}${bt.bottom}`}</option>)
    }

    return (
      <GridContainer>
        {isLogin ? (
          <BalloonEdit>
            {status.msg && <StatusMsg status={status} />}
            <Input
              type="text"
              size="30"
              value={textValue}
              onChange={e => handleTextChange(e)}
              onFocus={() => handleFocus(true)}
              onBlur={() => handleFocus(false)}
            />
            {isEditMode ? (
              <span>
                <sc.Button onClick={() => updateBalloonText()}>更新</sc.Button>
                <br />
                <sc.Button onClick={() => removeBalloonText()}>削除</sc.Button>
                <sc.Button onClick={() => handleCancelClick()}>キャンセル</sc.Button>
              </span>
            ) : (
                <sc.Button onClick={() => addBalloonText()}>新規追加</sc.Button>
              )}
            <br />
            <p>既存のテキストを編集</p>
            <Select value={selectValue} onChange={e => handleSelectChange(e)}>
              {options}
            </Select>
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
          <LinkButtons />
        </Links>
        <Balloon>
          <BalloonSvg
            balloonTexts={isFocused || textValue ? divideText(textValue) : balloonTexts}
          />
        </Balloon>
      </GridContainer>
    )
  }
}

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

  background-image: url(${home_bg});

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

const BalloonEdit = styled.div`
  grid-area: WelcomeMsg;
  grid-column: span 3;
  padding: 2vw;
  background-color: ${colors.cream};
`

const Input = sc.Input.extend`
  display: inline;
  margin: 1.5vw;
`

const Select = styled.select`
  padding: 2vw;
  border: 1px solid ${colors.black};

  ${media.desktop`
    padding: 0.5rem;
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

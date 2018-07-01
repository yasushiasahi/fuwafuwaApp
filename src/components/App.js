import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import { media, colors, sizes } from './styles.js'
import { fetchApi, getCookie } from './helpers.js'
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Main from './Main.js'
import Footer from './Footer.js'
import FullSizePicture from './FullSizePicture.js'

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isSidebarShown: false,
      mainViewComponentName: '',
      fullSizePicture: null,
      blogInfos: [],
      balloonTexts: [],
      inputTexts: { balloonText: '', userName: '', password: '', title: '', description: '' },
      errorMessage: '',
      galleryData: [],
      isLogIn: false,
      isBalloonEditShown: false
    }

    this.menuClickHandler = this.menuClickHandler.bind(this)
    this.pictureClickHandler = this.pictureClickHandler.bind(this)
    this.closeClickHandler = this.closeClickHandler.bind(this)
    this.getExciteBlogRssFeed = this.getExciteBlogRssFeed.bind(this)
    this.toggleBlogBoxOpen = this.toggleBlogBoxOpen.bind(this)
    this.apiLogInOrSignIn = this.apiLogInOrSignIn.bind(this)
    this.handleInputsChange = this.handleInputsChange.bind(this)
    this.handleHashChage = this.handleHashChage.bind(this)
    this.changeState = this.changeState.bind(this)
    this.judgeLogIn = this.judgeLogIn.bind(this)
    this.apiGetGalleryData = this.apiGetGalleryData.bind(this)
    this.changeStateKAI = this.changeStateKAI.bind(this)
  }

  componentDidMount() {
    this.apiGetBalloonTexts()

    this.handleHashChage()
    if (location.hash) {
      this.setState({
        mainViewComponentName: location.hash.slice(1)
      })
    } else {
      location.hash = '#Home'
    }

    this.judgeLogIn()
    this.getExciteBlogRssFeed()
    this.apiGetGalleryData()

    document.body.replaceChild(this.props.root, document.body.firstChild)
  }

  async apiGetGalleryData() {
    const response = await fetchApi('getGallery', {})
    this.setState({
      galleryData: response.body
    })
  }

  async apiGetBalloonTexts() {
    const response = await fetchApi('getBalloonTexts', {})
    this.setState({
      balloonTexts: response.body
    })
  }

  async judgeLogIn() {
    const cookie = document.cookie
    if (cookie.includes('userName') && cookie.includes('token')) {
      const { status, body } = await fetchApi('checkToken', {
        userName: getCookie('userName'),
        token: getCookie('token')
      })
      if (!status) {
        this.changeState('errorMessage', body)
        return
      }
      this.changeState('isLogIn', true)
    }
  }

  async apiLogInOrSignIn(url) {
    const { userName, password } = this.state.inputTexts
    if (!/^[a-zA-Z\d]{4,}$/.test(userName) || !/^[a-zA-Z\d-_~#$%&@:;*+?!,.¥]{8,}$/.test(password)) {
      this.setState({
        errorMessege: 'ユーザーネームまたはパスワードを正しく入力してください'
      })
      return
    }
    const response = await fetchApi(url, { userName, password })
    if (!response.status) {
      this.setState({
        errorMessege: response.body
      })
      return
    }
    document.cookie = `userName=${response.body.userName}`
    document.cookie = `token=${response.body.token}`
    if (this.state.errorMessege) {
      this.setState({
        errorMessege: ''
      })
    } else {
      this.setState({
        isLogin: true,
        errorMessege: ''
      })
    }
    location.hash = '#Home'
  }

  async getExciteBlogRssFeed() {
    const url = `https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cdate%2Clink%2Cdescription%20from%20rss%20where%20url%3D'https%3A%2F%2Ffuwafuwayo.exblog.jp%2Findex.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    const response = await fetch(url)
      .then(res => res.json())
      .then(json => json)
    const prevBlogInfos = response.query.results.item.map((obj, index) => {
      obj.id = index
      obj.isOpen = index === 0 ? true : false
      return obj
    })
    this.setState({
      blogInfos: prevBlogInfos
    })
  }

  handleInputsChange(event) {
    const inputTextsCopy = Object.assign({}, this.state.inputTexts)
    inputTextsCopy[event.target.name] = event.target.value
    this.setState({
      inputTexts: inputTextsCopy
    })
  }

  changeState(key, value) {
    this.setState({
      [key]: value
    })
  }

  changeStateKAI(states) {
    for (const key in states) {
      this.setState({
        [key]: states[key]
      })
    }
  }

  menuClickHandler() {
    this.setState({
      isSidebarShown: !this.state.isSidebarShown
    })
  }

  toggleBlogBoxOpen(id) {
    const provBlogInfos = this.state.blogInfos.map(blogInfo => {
      const copyblogInfo = Object.assign({}, blogInfo)
      if (copyblogInfo.id === id) copyblogInfo.isOpen = !copyblogInfo.isOpen
      return copyblogInfo
    })
    this.setState({
      blogInfos: provBlogInfos
    })
  }

  pictureClickHandler(pictureObj) {
    this.setState({
      fullSizePicture: (
        <FullSizePicture pictureObj={pictureObj} closeClickHandler={this.closeClickHandler} />
      )
    })
  }

  closeClickHandler() {
    this.setState({
      fullSizePicture: null
    })
  }

  handleHashChage() {
    window.addEventListener('hashchange', () => {
      if (this.state.isSidebarShown) {
        this.setState({
          mainViewComponentName: location.hash.slice(1),
          isSidebarShown: false
        })
      } else {
        this.setState({
          mainViewComponentName: location.hash.slice(1)
        })
      }
    })
  }

  render() {
    const {
      fullSizePicture,
      isSidebarShown,
      balloonTexts,
      blogInfos,
      mainViewComponentName,
      inputTexts: { balloonText, userName, password, title, description },
      errorMessage,
      galleryData,
      isLogIn
    } = this.state
    const {
      menuClickHandler,
      pictureClickHandler,
      toggleBlogBoxOpen,
      handleInputsChange,
      changeState,
      changeStateKAI
    } = this
    const bgsIndex = Math.floor(Math.random() * 17)
    return (
      <Container bgsIndex={bgsIndex}>
        {fullSizePicture}
        <Header menuClickHandler={menuClickHandler} isSidebarShown={isSidebarShown} />
        <Sidebar isSidebarShown={isSidebarShown} isLogIn={isLogIn} changeState={changeState} />
        <Main
          mainViewComponentName={mainViewComponentName}
          errorMessage={errorMessage}
          passToHome={{ isLogIn, balloonTexts, balloonText, changeStateKAI, handleInputsChange }}
          passToGallery={{
            isLogIn,
            title,
            description,
            changeState,
            handleInputsChange,
            pictureClickHandler,
            galleryData
          }}
          passToBlogIndex={{ blogInfos, toggleBlogBoxOpen }}
          passToAdminLogIn={{
            userName,
            password,
            handleInputsChange,
            changeState
          }}
        />
        <Footer />
      </Container>
    )
  }
}

import bg_01 from './../images/assets/bg_01.png'
import bg_02 from './../images/assets/bg_02.png'
import bg_03 from './../images/assets/bg_03.png'
import bg_04 from './../images/assets/bg_04.png'
import bg_05 from './../images/assets/bg_05.png'
import bg_06 from './../images/assets/bg_06.png'
import bg_07 from './../images/assets/bg_07.png'
import bg_08 from './../images/assets/bg_08.png'
import bg_09 from './../images/assets/bg_09.png'
import bg_10 from './../images/assets/bg_10.png'
import bg_11 from './../images/assets/bg_11.png'
import bg_12 from './../images/assets/bg_12.png'
import bg_13 from './../images/assets/bg_13.png'
import bg_14 from './../images/assets/bg_14.png'
import bg_15 from './../images/assets/bg_15.png'
import bg_16 from './../images/assets/bg_16.png'
import bg_17 from './../images/assets/bg_17.png'

const bgs = [
  bg_01,
  bg_02,
  bg_03,
  bg_04,
  bg_05,
  bg_06,
  bg_07,
  bg_08,
  bg_09,
  bg_10,
  bg_11,
  bg_12,
  bg_13,
  bg_14,
  bg_15,
  bg_16,
  bg_17
]

const Container = styled.div`
  width: 100vw;
  display: grid;
  grid-template-rows: ${sizes.mobileHeaderHeight} auto auto;
  grid-template-columns: auto 0px;
  grid-template-areas:
    'Header Header'
    'Main   Sidebar'
    'Footer Sidebar';

  background-color: ${colors.cream};
  background-image: url(${props => bgs[props.bgsIndex]});
  background-attachment: fixed;

  ${media.desktop`
    grid-template-rows: ${sizes.desktopHeaderHeight} auto auto;
    grid-template-columns: auto 250px;
    grid-template-areas:
      'Main   Header'
      'Main   Sidebar'
      'Footer Sidebar';
  `};
`

export default hot(module)(App)

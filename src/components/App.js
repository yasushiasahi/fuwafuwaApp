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
  constructor() {
    super()

    this.state = {
      isSidebarShown: false,
      mainViewComponentName: '',
      fullSizePicture: null,
      blogInfos: [],
      balloonText: { top: 'よりさらに', middle: '美しくなり', bottom: 'ましょう' },
      inputTexts: { userName: '', password: '', title: '', description: '' },
      errorMessage: '',
      galleryData: [],
      isLogIn: false
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
  }

  componentDidMount() {
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
  }

  async apiGetGalleryData() {
    const response = await fetchApi('getGallery', {})
    this.setState({
      galleryData: response.body
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
      balloonText,
      blogInfos,
      mainViewComponentName,
      inputTexts: { userName, password, title, description },
      errorMessage,
      galleryData,
      isLogIn
    } = this.state
    const {
      menuClickHandler,
      pictureClickHandler,
      toggleBlogBoxOpen,
      handleInputsChange,
      changeState
    } = this

    return (
      <Container>
        {fullSizePicture}
        <Header menuClickHandler={menuClickHandler} isSidebarShown={isSidebarShown} />
        <Sidebar isSidebarShown={isSidebarShown} isLogIn={isLogIn} changeState={changeState} />
        <Main
          mainViewComponentName={mainViewComponentName}
          errorMessage={errorMessage}
          passToHome={{ balloonText }}
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

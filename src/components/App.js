import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import MainSwitcher from './MainSwitcher'
import Home from './home/Home.js'
import Greeting from './greeting/Greeting'
import BrightHairDye from './brightHairDye/BrightHairDye'
import AdminLogIn from './adminLogIn/AdminLogIn'
import common from './common/commonIndex'
const {
  helpers: { fetchApi },
  styles: { media, colors, sizes }
} = common
import images from '../images/imageIndex'
const {
  assets: { bgs }
} = images

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isSidebarShown: false,
      isLogin: false,
      mainComponentName: '',
      balloonTexts: []
    }
    this.handleHashChage = this.handleHashChage.bind(this)
    this.setBalloonTexts = this.setBalloonTexts.bind(this)
    this.toggleSidebarShown = this.toggleSidebarShown.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  componentDidMount() {
    this.handleHashChage()
    this.setState({ mainComponentName: location.hash.slice(1) })
    fetchApi('getBalloonTexts', {}).then(r => {
      this.setBalloonTexts(r.body || [])
      document.body.replaceChild(this.props.root, document.body.firstChild)
    })
    fetchApi('makeSession', {}).then(r => {
      this.setState({ isLogin: r.status })
    })
  }

  handleHashChage() {
    window.addEventListener('hashchange', () => {
      const iss = this.state.isSidebarShown
      const h = location.hash.slice(1)
      if (iss) {
        this.setState({
          mainComponentName: h,
          isSidebarShown: false
        })
      } else {
        this.setState({
          mainComponentName: h
        })
      }
    })
  }

  setBalloonTexts(bts) {
    this.setState({ balloonTexts: bts })
  }

  toggleSidebarShown() {
    this.setState({ isSidebarShown: !this.state.isSidebarShown })
  }

  handleLogin(bool) {
    if (!bool) {
      fetchApi('breakSession', {})
    }
    this.setState({ isLogin: bool })
  }

  render() {
    const { isSidebarShown, isLogin, mainComponentName, balloonTexts } = this.state
    const { setBalloonTexts, toggleSidebarShown, handleLogin } = this
    const bgsIndex = Math.floor(Math.random() * 17)

    return (
      <GridContainer bgsIndex={bgsIndex}>
        <Header pass={{ isSidebarShown, toggleSidebarShown }} />
        <Sidebar pass={{ isSidebarShown, isLogin, handleLogin }} />
        <MainSwitcher pass={{ mainComponentName }}>
          <Home key="Home" pass={{ isLogin, balloonTexts, setBalloonTexts }} />
          <Greeting key="Greeting" />
          <BrightHairDye key="BrightHairDye" />
          <AdminLogIn key="AdminLogIn" pass={{ isLogin, handleLogin }} />
        </MainSwitcher>
        <Footer />
      </GridContainer>
    )
  }
}

const GridContainer = styled.div`
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

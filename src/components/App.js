import React from 'react'
import styled from 'styled-components'
import { hot } from 'react-hot-loader'
import Header from './Header.js'
import Sidebar from './Sidebar.js'
import Footer from './Footer.js'
import MainRouter from './MainRouter'
import Home from './home/Home.js'
import Greeting from './greeting/Greeting'
import SalonInfo from './salonInfo/SalonInfo'
import Menu from './menu/Menu'
import BrightHairDye from './brightHairDye/BrightHairDye'
import BlogIndex from './blogIndex/BlogIndex'
import Gallery from './gallery/Gallery'
import AdminLogIn from './adminLogIn/AdminLogIn'
import common from './common/commonIndex'
const {
  helpers: { fetchApi, getRssFeed },
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
      transHist: '',
      balloonTexts: [],
      blogFeeds: [],
      galleryData: []
    }
    this.setHashChageListener = this.setHashChageListener.bind(this)
    this.toggleBlogBoxOpen = this.toggleBlogBoxOpen.bind(this)
    this.setBalloonTexts = this.setBalloonTexts.bind(this)
    this.toggleSidebarShown = this.toggleSidebarShown.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
    this.updateGallaryData = this.updateGallaryData.bind(this)
  }

  componentDidMount() {
    fetchApi('getBalloonTexts', {}).then(r => {
      this.setBalloonTexts(r.body || [])
      document.body.replaceChild(this.props.root, document.body.firstChild)
    })
    if (!location.hash) {
      location.hash = 'Home'
    }
    this.setHashChageListener()
    Promise.all([fetchApi('makeSession', {}), fetchApi('getGallery', {}), getRssFeed()]).then(
      ([{ status }, { body }, feeds]) => {
        this.setState({
          isLogin: status,
          galleryData: body,
          blogFeeds: feeds,
          transHist: `${location.hash.slice(1)}`
        })
      }
    )
  }

  componentWillUnmount() {
    fetchApi('saveTransHist', this.state.transHist)
  }

  setHashChageListener() {
    window.addEventListener('hashchange', () => {
      const { isSidebarShown, transHist } = this.state
      if (isSidebarShown) {
        this.setState({
          transHist: `${transHist},${location.hash.slice(1)}`,
          isSidebarShown: false
        })
      } else {
        this.setState({ transHist: `${transHist},${location.hash.slice(1)}` })
      }
    })
  }

  toggleBlogBoxOpen(id) {
    const nbf = this.state.blogFeeds.map(bf => {
      const cbf = Object.assign({}, bf)
      if (cbf.id === id) cbf.isOpen = !cbf.isOpen
      return cbf
    })
    this.setState({ blogFeeds: nbf })
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

  updateGallaryData(data) {
    this.setState({ galleryData: data })
  }

  render() {
    const { isSidebarShown, isLogin, balloonTexts, blogFeeds, galleryData } = this.state
    const {
      setBalloonTexts,
      toggleBlogBoxOpen,
      toggleSidebarShown,
      handleLogin,
      updateGallaryData
    } = this
    const bgsIndex = Math.floor(Math.random() * bgs.length)

    return (
      <GridContainer bgsIndex={bgsIndex}>
        <Header pass={{ isSidebarShown, toggleSidebarShown }} />
        <Sidebar pass={{ isSidebarShown, isLogin, handleLogin }} />
        <MainRouter>
          <Home key="Home" pass={{ isLogin, balloonTexts, setBalloonTexts }} />
          <Greeting key="Greeting" />
          <SalonInfo key="SalonInfo" />
          <BrightHairDye key="BrightHairDye" />
          <Menu key="Menu" />
          <Gallery key="Gallery" pass={{ isLogin, galleryData, updateGallaryData }} />
          <BlogIndex key="BlogIndex" pass={{ blogFeeds, toggleBlogBoxOpen }} />
          <AdminLogIn key="AdminLogIn" pass={{ isLogin, handleLogin }} />
        </MainRouter>
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

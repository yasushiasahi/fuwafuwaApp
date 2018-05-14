import React from 'react'
import styled from 'styled-components'

import { colors } from './styles.js'
import logo from './../assets/edged_logo.svg'
import headBackground from './../assets/head_background.svg'
import moreWonderfulLife from './../assets/more_wonderful_life.svg'

const Header = () => {
  return (
    <Head>
      <Wrapper>
        <LogoWrapper>
          <MoreWonderFulLife src={moreWonderfulLife}/>
          <Logo src={logo}/>
        </LogoWrapper>
      </Wrapper>
    </Head>
  )
}

const Head = styled.header`
  background: ${colors.base};
`
const Wrapper = styled.div`
`

const LogoWrapper = styled.div`

  background-image: url(${headBackground});
  background-repeat: no-repeat;
  background-size: cover;
  height: 25vw;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 8vw 12vw;
  align-content: center;
  justify-items: center;
  align-items: center;
`

const Logo = styled.img`
  width: 95vw;
`

const MoreWonderFulLife = styled.img`
  width: 75vw
`


export default Header

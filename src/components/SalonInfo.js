import React from 'react'
import styled from 'styled-components'
import GoogleMap from './GoogleMap.js'
import { colors, sc } from './styles.js'
import interior_0 from './../images/salon_info/0_interior.jpg'
import logo from './../images/assets/logo.svg'


const SalonInfo = () => {
  return (
    <Container>
      <Wrappar>
        <sc.H1>お店情報</sc.H1>
        <sc.Img
          src={interior_0}
          alt='サロン内観'/>
        <Logo
          src={logo}
          slt='ロゴ'/>
        <sc.P>福岡市南区玉川町4-27 オークヒルズ高宮303</sc.P>
        <sc.P>電話　092-710-2528</sc.P>
        <sc.P>営業　10:00~20:00(日曜10:00~17:30)</sc.P>
        <sc.P>定休　毎週火曜</sc.P>
        <GoogleMap/>
      </Wrappar>
    </Container>
  )
}


const Container = styled.div`
  background: ${colors.lemon};
  padding-top: 4vw;
`

const Wrappar = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 2vw;
  background: ${colors.cream};
`

const Logo = styled.img`
  width: 70%;
  margin-bottom: 4vw;
`

export default SalonInfo

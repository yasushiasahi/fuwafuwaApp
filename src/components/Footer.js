import React from 'react'
import styled from 'styled-components'
import { colors, sizes } from './styles.js'
import logo from './../images/assets/logo.svg'


const Footer = () => {

  return (
    <GridContainer>
      <Logo
        src={logo}
        alt='ロゴ'/>
      <Links>
        <Link>ホーム</Link>
        <Link>ご挨拶</Link>
        <Link>お店情報</Link>
        <Link>メニュー</Link>
        <Link>ブログ</Link>
        <Link>画廊</Link>
      </Links>
      <Copyright>Copyrights © fuwafuwa Hair Salon All Rights Reserved.</Copyright>
    </GridContainer>
  )
}

const GridContainer = styled.header`
  background-color: ${colors.yellow};
  display: grid;
  grid-template-rows: 8vw 10vw 9vw;
  grid-template-columns: auto;
  grid-template-areas:
    "logo"
    "links"
    "copyright";
  box-sizing: border-box;
`

const Logo = styled.img`
  grid-area: logo;
  width: 50vw;
  justify-self: center;
  align-self: end;
`

const Links = styled.ul`
  grid-area: links;
  display: flex;
  justify-content: space-around;
  align-items: center;
  list-style: none;
`

const Link = styled.li`
  font-size: 3vw;
`

const Copyright = styled.div`
  grid-area: copyright;
  text-align: center;
  font-size: 2.5vw;
  line-height: 9vw;
`

export default Footer

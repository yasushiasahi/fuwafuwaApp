import React from 'react'
import styled from 'styled-components'
import common from './common/commonIndex'
const {
  LinkButtons,
  styles: { media, sizes }
} = common
import images from '../images/imageIndex'
const {
  assets: { logo }
} = images

const Footer = () => (
  <Wrapper>
    <GridContainer>
      <Logo>
        <img src={logo} alt="ロゴ" />
      </Logo>
      <Links>
        <LinkButtons />
      </Links>
      <Copyright>
        <p>Copyrights © fuwafuwa Hair Salon All Rights Reserved.</p>
      </Copyright>
    </GridContainer>
  </Wrapper>
)

const Wrapper = styled.div`
  grid-area: Footer;
`

const GridContainer = styled.footer`
  height: ${sizes.mobileFooterHeight};
  display: grid;
  grid-template-rows: auto auto auto;
  grid-template-columns: auto;
  grid-template-areas:
    'logo'
    'links'
    'copyright';
  align-content: space-evenly;

  box-sizing: border-box;

  ${media.desktop`
    width: ${sizes.desktopMainWidth};
    height: ${sizes.desktopFooterHeight};
    margin: 0 auto;
  `};
`

const Logo = styled.div`
  grid-area: logo;
  justify-self: center;
  width: 50%;

  img {
    width: 100%;
  }
`

const Links = styled.div`
  grid-area: links;

  ul {
    height: 100%;
    display: flex;
    justify-content: space-evenly;

    li {
      margin-bottom: 0;
      img {
        height: 5vw;
      }

      ${media.desktop`
        margin-bottom: 15px;
        img {
          height: 30px;
        }
      `};
    }
  }
`

const Copyright = styled.div`
  grid-area: copyright;
  justify-self: center;

  p {
    font-size: 2.5vw;

    ${media.desktop`
      font-size: 15px;
    `};
  }
`

export default Footer

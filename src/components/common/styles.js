import styled, { css } from 'styled-components'
import images from '../../images/imageIndex'
const {
  assets: { head_background_2 }
} = images

const colors = {
  yellow: '#ffe866',
  lime: '#66ff9c',
  blue: '#667dff',
  pink: '#ff66c9',
  black: '#332e14',
  cream: '#fff7cc',
  skyblue: '#66ffe8',
  lemon: 'lime'
}

const sizes = {
  mobileHeaderHeight: '10vw',
  mobileFooterHeight: '25vw',
  desktopHeaderHeight: '60px',
  desktopFooterHeight: '180px',
  desktopMainWidth: '740px',
  desktopSideberWidth: '250px'
}

const properties = {
  boxShadow: (isInset = false, isYoffsetMinus = false) => {
    const inset = isInset ? 'inset' : ''
    const yoffset = isYoffsetMinus ? '-.3vw' : '.3vw'
    return `${inset} 0 ${yoffset} .6vw 0 rgba(0,0,0,.6)`
  }
}

const mediaSizes = {
  desktop: 992,
  tablet: 768,
  phone: 376
}

const media = Object.keys(mediaSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${mediaSizes[label]}px) {
      ${css(...args)};
    }
  `
  return acc
}, {})

const H1 = styled.h1`
  font-size: 7vw;
  color: white;
  text-shadow: 2px 2px 1px #000, -2px 2px 1px #000, 2px -2px 1px #000, -2px -2px 1px #000;
  border-radius: 6vw;
  margin: 4vw 0;
  text-align: center;
  background-image: url(${head_background_2});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  ${media.desktop`
    font-size: 40px;
    margin:20px 0;
  `};
`

const P = styled.p`
  font-size: 4vw;
  color: ${colors.black};
  margin-bottom: 4vw;

  ${media.desktop`
    font-size: 1rem;
    margin-bottom: 10px;
  `};
`

const Img = styled.img`
  width: 100%;
  margin-bottom: 4vw;
`

const Input = styled.input`
  display: block;
  padding: 2vw 1vw;
  margin-bottom: 3vw;
  border: 1px solid ${colors.black};

  ${media.desktop`
    padding: .3rem;
    margin-bottom: 20px;
    font-size: 1rem;
  `};
`

const Button = styled.button`
  display: inline-block;
  background-color: ${colors.lime};
  padding: 1vw 2vw;
  margin-top: 1vw;
  margin-right: 4vw;
  font-size: 1rem;
  box-shadow: ${properties.boxShadow()};
  cursor: pointer;
  border: none;
  outline: none;
  appearance: none;

  ${media.desktop`
    padding: .2rem .5rem;
  `};
`

const sc = {
  H1,
  P,
  Img,
  Input,
  Button
}

export default { colors, sizes, properties, media, sc }

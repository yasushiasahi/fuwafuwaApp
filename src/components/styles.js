import styled, { css, injectGlobal } from 'styled-components'

export const colors = {
  yellow: '#ffe866',
  lime: '#66ff9c',
  blue: '#667dff',
  pink: '#ff66c9',
  black: '#332e14',
  cream: '#fff7cc',
  skyblue: '#66ffe8',
  lemon: 'lime'
}

export const sizes = {
  mobileHeaderHeight: '10vw',
  mobileFooterHeight: '25vw',
  desktopHeaderHeight: '60px',
  desktopFooterHeight: '180px',
  desktopMainWidth: '740px'
}

export const properties = {
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

export const media = Object.keys(mediaSizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${mediaSizes[label]}px) {
      ${css(...args)};
    }
  `
  return acc
}, {})

const H1 = styled.h1`
  font-size: 7vw;
  color: ${colors.black};
  border-radius: 6vw;
  margin: 4vw 0;
  text-align: center;
  background-size: 30px 30px;
  background-color: #ffe866;
  background-image: linear-gradient(
      45deg,
      rgba(232, 102, 255, 0.5) 25%,
      transparent 25%,
      transparent 50%,
      rgba(232, 102, 255, 0.5) 50%,
      rgba(232, 102, 255, 0.5) 75%,
      transparent 75%,
      transparent
    ),
    linear-gradient(
      -45deg,
      rgba(232, 102, 255, 0.5) 25%,
      transparent 25%,
      transparent 50%,
      rgba(232, 102, 255, 0.5) 50%,
      rgba(232, 102, 255, 0.5) 75%,
      transparent 75%,
      transparent
    );

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

export const sc = {
  H1,
  P,
  Img,
  Input,
  Button
}

injectGlobal`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: black;
    margin: 0;
    padding: 0;
  }

  div {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1 {
    margin: 0;
  }

  input {
    box-sizing: border-box;
  }
`

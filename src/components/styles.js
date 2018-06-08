import styled, { css } from 'styled-components'

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
  headerHeight: '10vw'
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
  border-radius: 6vw;
  margin-bottom: 4vw;

  ${media.desktop`
    font-size: 40px;
    margin: 30px 0;
  `};
`

const P = styled.p`
  font-size: 4vw;
  color: ${colors.black};
  margin-bottom: 4vw;

  ${media.desktop`
    font-size: 20px;
    margin-bottom: 10px;
  `};
`

const Img = styled.img`
  width: 100%;
  margin-bottom: 4vw;
`

const Input = styled.input`
  display: block;
  height: 8vw;
  margin-bottom: 3vw;
  font-size: 3vw;
  border: 1px solid ${colors.black};
`

const Button = styled.span`
  display: inline-block;
  background-color: ${colors.lime};
  padding: 1vw 2vw;
  margin-top: 1vw;
  margin-right: 4vw;
  box-shadow: ${properties.boxShadow()};
`

export const sc = {
  H1,
  P,
  Img,
  Input,
  Button
}

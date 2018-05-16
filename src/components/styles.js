import styled from 'styled-components'

export const colors = {
  yellow: '#ffe866',
  lime: '#66ff9c',
  blue: '#667dff',
  pink: '#ff66c9',
  black: '#332e14',
  cream: '#fff7cc',
  skyblue: '#66ffe8',
  lemon: '#fff099'
}

export const sizes = {
  headerHeight: '10vw'
}



const H1 = styled.h1`
  font-size: 7vw;
  color: ${colors.black};
  text-align: center;
  background-size: 30px 30px;
  background-color: #ffe866;
  background-image: linear-gradient(45deg, rgba(232, 102, 255, 0.5) 25%, transparent 25%,
                    transparent 50%, rgba(232, 102, 255, 0.5) 50%, rgba(232, 102, 255, 0.5) 75%,
                    transparent 75%, transparent),
                  linear-gradient(-45deg, rgba(232, 102, 255, 0.5) 25%, transparent 25%,
                    transparent 50%, rgba(232, 102, 255, 0.5) 50%, rgba(232, 102, 255, 0.5) 75%,
                    transparent 75%, transparent);
  border-radius: 6vw;
  margin-bottom: 4vw;
`

const P = styled.p`
  font-size: 4vw;
  color: ${colors.black};
  margin-bottom: 4vw;
`

const Img = styled.img`
  width: 100%;
  margin-bottom: 4vw;
`

export const sc = {
  H1,
  P,
  Img
}

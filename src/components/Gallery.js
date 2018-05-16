import React from 'react'
import styled from 'styled-components'
import { colors, sc } from './styles.js'
import pictureData from './../databases/pictureData.js'


const Gallery = (props) => {
  const { pictureClickHandler } = props

  const pictures = pictureData.map(pictureObj => {
    const {
      id,
      name,
      title
    } = pictureObj

    return(
      <Box
        key={id}
        url={require(`./../images/gallery/${name}`)}
        onClick={() => pictureClickHandler(pictureObj)}>
        <PicTitle>{title}</PicTitle>
      </Box>
    )
  })

  return (
    <Container>
      <Wrappar>
        <sc.H1>ヤスコロリ画廊</sc.H1>
        <GridContainer>
          {pictures}
        </GridContainer>
      </Wrappar>
    </Container>
  )
}

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-auto-rows: ${91*0.3*1.3}vw;
  grid-row-gap: 2vw;
  justify-content: space-evenly;
`

const Box = styled.div`
  background-color: lime;
  background-image: url(${props => (props.url)});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: 0 .3vw .6vw 0 rgba(0,0,0,.6);
  padding-top: 1vw;
`

const PicTitle = styled.span`
  font-size: 2.5vw;
  font-weight: bold;
  color: ${colors.black};
  background-color: rgba(255,255,255,.5);
`

const Container = styled.div`
  background: ${colors.lemon};
  padding-top: 4vw;
`

const Wrappar = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 2vw 0;
  background: ${colors.cream};
`


export default Gallery

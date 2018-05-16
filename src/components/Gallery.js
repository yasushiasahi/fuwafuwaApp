import React from 'react'
import styled from 'styled-components'
import { colors, sc } from './styles.js'

const jpegs = [
  {id:0, title:'タイトルタイトル0' ,name:`p0.jpg`},
  {id:1, title:'タイトルタイトル1' ,name:`p1.jpg`},
  {id:2, title:'タイトルタイトル2' ,name:`p2.jpg`},
  {id:3, title:'タイトルタイトル3' ,name:`p3.jpg`},
  {id:4, title:'タイトルタイトル4' ,name:`p4.jpg`},
  {id:5, title:'タイトルタイトル5' ,name:`p5.jpg`},
  {id:6, title:'タイトルタイトル0' ,name:`p0.jpg`},
  {id:7, title:'タイトルタイトル1' ,name:`p1.jpg`},
  {id:8, title:'タイトルタイトル2' ,name:`p2.jpg`},
  {id:9, title:'タイトルタイトル3' ,name:`p3.jpg`},
  {id:10, title:'タイトルタイトル4' ,name:`p4.jpg`},
  {id:11, title:'タイトルタイトル5' ,name:`p5.jpg`},
]

const Gallery = () => {
  const pictures = jpegs.map(jpeg => {
    return(
      <Box
        key={jpeg.id}
        url={require(`./../images/gallery/${jpeg.name}`)}>
        <PicTitle>{jpeg.title}</PicTitle>
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

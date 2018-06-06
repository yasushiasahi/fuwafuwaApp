import React from 'react'
import styled from 'styled-components'
import closePict from './../images/assets/close_menu.svg'

const FullSizePicture = ({
  pictureObj: { title, pictureName, description },
  closeClickHandler
}) => {
  const src = `./images/gallery/${pictureName}`

  return (
    <Wrapper>
      <GridContainer>
        <Pic src={src} />
        <Info>
          <PicTitle>{title}</PicTitle>
          <Explanation>{description}</Explanation>
        </Info>
        <Button onClick={() => closeClickHandler()}>
          <ClosePict src={closePict} />
        </Button>
      </GridContainer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

const GridContainer = styled.div`
  width: 95vw;
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: auto auto;
  grid-template-areas:
    'pic pic'
    'info button';
  justify-content: center;
  align-content: center;
  align-items: center;
`

const Pic = styled.img`
  grid-area: pic;
  width: 100%;
  padding: 1vw 1vw 0 1vw;
`

const Info = styled.div`
  grid-area: info;
  padding: 2vw 0 2vw 2vw;
  color: #eee;
`

const PicTitle = styled.div`
  font-size: 4vw;
  margin-bottom: 1vw;
`

const Explanation = styled.div`
  font-size: 3vw;
`

const Button = styled.div`
  grid-area: button;
  width: 60%;
  padding: 1vw;
  justify-self: center;
  background-color: rgba(255, 255, 255, 0.6);
`

const ClosePict = styled.img`
  grid-area: button;
  display: block;
  width: 100%;
`

export default FullSizePicture

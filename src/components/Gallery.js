import React from 'react'
import styled from 'styled-components'
import { colors, sc, properties } from './styles.js'
import { fetchApi, getCookie } from './helpers.js'
import pictureData from './../databases/pictureData.js'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
  }

  render() {
    const {
      passToGallery: {
        isLogIn,
        title,
        description,
        handleInputsChange,
        changeState,
        pictureClickHandler,
        galleryData
      }
    } = this.props

    const upload = async () => {
      const picture = this.fileInput.files[0]
      if (!title || !description || !picture) {
        let prevErrorMessage = ''
        prevErrorMessage += title ? '' : 'タイトルを入力してください。'
        prevErrorMessage += description ? '' : 'タイトルを入力してください。'
        prevErrorMessage += picture ? '' : 'ファイルを選択してください。'
        changeState('errorMessage', prevErrorMessage)
        return
      }
      const response = await fetchApi('checkToken', {
        userName: getCookie('userName'),
        token: getCookie('token')
      })
      if (!response.status) {
        changeState('errorMessage', response.body)
        return
      }
      const formData = new FormData()
      formData.append('userName', getCookie('userName'))
      formData.append('title', title)
      formData.append('description', description)
      formData.append('picture', picture)
      const { status, body } = await fetchApi('uploadPicture', formData)
      if (!status) {
        changeState('errorMessage', body)
        return
      }
      changeState('galleryData', body)
      changeState('inputTexts', { userName: '', password: '', title: '', description: '' })
      this.fileInput.value = null
    }

    const uploadForm = (
      <FromAria>
        <p>タイトル</p>
        <sc.Input
          type="text"
          name="title"
          size="30"
          value={title}
          onChange={e => handleInputsChange(e)}
        />
        <p>解説</p>
        <Textarea
          name="description"
          cols="40"
          rows="4"
          value={description}
          onChange={e => handleInputsChange(e)}
        />
        <input type="file" ref={input => (this.fileInput = input)} />
        <sc.Button onClick={() => upload()}>アップロード</sc.Button>
      </FromAria>
    )

    const pictures = pictureData.map(pictureObj => {
      const { id, name, title } = pictureObj
      return (
        <Box
          key={id}
          url={require(`./../images/gallery/${name}`)}
          onClick={() => pictureClickHandler(pictureObj)}>
          <PicTitle>{title}</PicTitle>
        </Box>
      )
    })

    return (
      <Wrappar>
        {isLogIn && uploadForm}
        <sc.H1>ヤスコロリ画廊</sc.H1>
        <GridContainer>{pictures}</GridContainer>
      </Wrappar>
    )
  }
}

const FromAria = styled.div`
  padding: 2vw;
  border: 1px solid ${colors.black};
`

const Textarea = styled.textarea`
  border: 1px solid ${colors.black};
`

const Wrappar = styled.div`
  padding: 2vw 0;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-auto-rows: ${91 * 0.3 * 1.3}vw;
  grid-row-gap: 2vw;
  justify-content: space-evenly;
`

const Box = styled.div`
  background-color: lime;
  background-image: url(${props => props.url});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  box-shadow: ${properties.boxShadow()};
  padding-top: 1vw;
`

const PicTitle = styled.span`
  font-size: 2.5vw;
  font-weight: bold;
  color: ${colors.black};
  background-color: rgba(255, 255, 255, 0.5);
`

export default Gallery

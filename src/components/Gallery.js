import React from 'react'
import styled from 'styled-components'
import { colors, sc, properties } from './styles.js'
import { fetchApi, getCookie } from './helpers.js'
import pictureData from '../databases/pictureData.js'

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.fileInput = React.createRef()
    this.isUpdate = false
    this.updatePictureName = null
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
      changeState('errorMessage', '')
      changeState('inputTexts', { userName: '', password: '', title: '', description: '' })
      this.fileInput.value = null
      changeState('galleryData', body)
    }

    const selectUpdatePic = (
      event,
      { title: updateIitle, description: updateDescription, pictureName: updatePictureName }
    ) => {
      event.stopPropagation()
      this.updatePictureName = updatePictureName
      this.isUpdate = true
      changeState('inputTexts', {
        userName: '',
        password: '',
        title: updateIitle,
        description: updateDescription
      })
    }

    const update = async () => {
      const response = await fetchApi('checkToken', {
        userName: getCookie('userName'),
        token: getCookie('token')
      })
      if (!response.status) {
        changeState('errorMessage', response.body)
        return
      }

      const picture = this.fileInput.files[0]
      const formData = new FormData()
      formData.append('pictureName', this.updatePictureName)
      formData.append('title', title)
      formData.append('description', description)
      picture && formData.append('picture', picture)

      const { status, body } = await fetchApi('updatePicture', formData)
      if (!status) {
        changeState('errorMessage', body)
        return
      }
      changeState('errorMessage', '')
      changeState('inputTexts', { userName: '', password: '', title: '', description: '' })
      this.fileInput.value = null
      this.isUpdate = false
      changeState('galleryData', body)
    }

    const deletePicture = async () => {
      const response = await fetchApi('checkToken', {
        userName: getCookie('userName'),
        token: getCookie('token')
      })
      if (!response.status) {
        changeState('errorMessage', response.body)
        return
      }

      const { status, body } = await fetchApi('deletePicture', {
        pictureName: this.updatePictureName
      })
      console.log('body = ', body)
      console.log('status = ', status)

      if (!status) {
        changeState('errorMessage', body)
        return
      }
      console.log('ほげほげ')
      changeState('errorMessage', '')
      changeState('inputTexts', { userName: '', password: '', title: '', description: '' })
      this.fileInput.value = null
      this.isUpdate = false
      changeState('galleryData', body)
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
        {this.isUpdate || <sc.Button onClick={() => upload()}>追加</sc.Button>}
        {this.isUpdate && <sc.Button onClick={() => update()}>更新</sc.Button>}
        {this.isUpdate && <sc.Button onClick={() => deletePicture()}>削除</sc.Button>}
      </FromAria>
    )

    const boxs = galleryData.map(obj => {
      const { title, pictureName } = obj
      return (
        <Box
          key={pictureName.slice(0, -4)}
          url={`./images/gallery/${pictureName}`}
          onClick={() => pictureClickHandler(obj)}>
          <PicTitle>{title}</PicTitle>
          <br />
          <br />
          <br />
          <sc.Button onClick={e => selectUpdatePic(e, obj)}>編集</sc.Button>
        </Box>
      )
    })

    return (
      <Wrappar>
        {isLogIn && uploadForm}
        <sc.H1>ヤスコロリ画廊</sc.H1>
        <GridContainer>{boxs}</GridContainer>
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

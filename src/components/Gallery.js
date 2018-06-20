import React from 'react'
import styled from 'styled-components'
import { media, colors, sc, properties } from './styles.js'
import { fetchApi, getCookie } from './helpers.js'

class Gallery extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fileInputMessege: '画像ファイルを選択してください',
      fileInputColor: colors.lime
    }

    this.fileInput = React.createRef()
    this.isUpdate = false
    this.updatePictureName = null
  }

  handleFileInputChanage() {
    console.log(this.fileInput.files)
    let provFileInputMessege = ''
    let provFileInputColor = ''
    if (!this.fileInput.files.length) {
      provFileInputMessege = 'ファイルが選択されていません'
      provFileInputColor = colors.pink
      return
    }
    const { name, type } = this.fileInput.files[0]
    switch (type) {
      case 'image/jpeg':
      case 'image/pjpeg':
      case 'image/png':
      case 'image/gif':
        provFileInputMessege = `${name} が選択されました`
        provFileInputColor = colors.skyblue
        break
      default:
        provFileInputMessege = `${type.split('/')[1]}形式は選択できません`
        provFileInputColor = colors.pink
        break
    }
    this.setState({
      fileInputMessege: provFileInputMessege,
      fileInputColor: provFileInputColor
    })
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

    const uploadForm = (
      <FormAria>
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
        <br />
        <InputLabel fileInputColor={this.state.fileInputColor}>
          {this.state.fileInputMessege}
          <input
            type="file"
            style={{ display: 'none' }}
            ref={input => (this.fileInput = input)}
            onChange={() => this.handleFileInputChanage()}
          />
        </InputLabel>
        <br />
        {this.isUpdate || <sc.Button onClick={() => upload()}>追加</sc.Button>}
        {this.isUpdate && <sc.Button onClick={() => update()}>更新</sc.Button>}
        {this.isUpdate && <sc.Button onClick={() => deletePicture()}>削除</sc.Button>}
      </FormAria>
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
          {isLogIn && <sc.Button onClick={e => selectUpdatePic(e, obj)}>編集</sc.Button>}
        </Box>
      )
    })

    return (
      <Wrapper>
        {isLogIn && uploadForm}
        <sc.H1>ヤスコロリ画廊</sc.H1>
        <GridContainer>{boxs}</GridContainer>
      </Wrapper>
    )
  }
}

const Wrapper = styled.div`
  padding-bottom: 4vw;

  ${media.desktop`
    padding-bottom: 20px;
  `};
`

const FormAria = styled.div`
  margin: 4vw 0;
  padding: 2vw;
  border: 1px solid ${colors.black};

  ${media.desktop`
    margin: 20px 0;
  `};
`

const Textarea = styled.textarea`
  margin-bottom: 3vw;
  padding: 1vw;
  border: 1px solid ${colors.black};

  ${media.desktop`
    padding: .3rem;
    margin-bottom: 15px;
    font-size: 1rem;
  `};
`

const InputLabel = styled.label`
  display: inline-block;
  padding: 1vw 3vw;
  margin-bottom: 3vw;
  box-shadow: ${properties.boxShadow()};
  background-color: ${props => props.fileInputColor};

  ${media.desktop`
    padding: .2rem .5rem;
    margin-bottom: 10px;
  `};
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 30%);
  grid-auto-rows: ${91 * 0.3 * 1.3}vw;
  grid-row-gap: 2vw;
  justify-content: space-evenly;

  ${media.desktop`
    grid-auto-rows: 300px;
  `};
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
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.black};
  background-color: rgba(255, 255, 255, 0.5);

  ${media.desktop`
    font-size: 20px;
  `};
`

export default Gallery

import React from 'react'
import styled from 'styled-components'
import FullScreenPic from './FullScreenPic'
import common from '../common/commonIndex'
const {
  StatusMsg,
  helpers: { fetchApi },
  styles: { media, colors, sc, properties }
} = common

class Gallery extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tiVal: '',
      taVal: '',
      fiLab: { msg: '画像ファイルを選択してください', col: colors.lime },
      edit: { target: '', isEdit: false },
      status: { msg: '', isOk: false },
      fsp: { isShown: false, picInfo: { title: '', pictureName: '', description: '' } }
    }

    this.fileInput = React.createRef()

    this.toglleFullScreenPic = this.toglleFullScreenPic.bind(this)
    this.handleInputsChange = this.handleInputsChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.refreshStates = this.refreshStates.bind(this)
    this.upload = this.upload.bind(this)
    this.deletePic = this.deletePic.bind(this)
    this.update = this.update.bind(this)
  }

  toglleFullScreenPic(picInfo) {
    this.setState({
      fsp: {
        isShown: !this.state.fsp.isShown,
        picInfo: picInfo || { title: '', pictureName: '', description: '' }
      }
    })
  }

  handleInputsChange(e) {
    const { name, value } = e.target
    this.setState({ [`${name}Val`]: value })
  }

  handleFileInputChanage() {
    const fis = this.fileInput.files
    const ssFiLab = (m, c) => {
      this.setState({ fiLab: { msg: m, col: c } })
    }
    if (!fis.length) {
      ssFiLab('ファイルが選択されていません', colors.pink)
      return
    }
    if (!['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif'].includes(fis[0].type)) {
      ssFiLab(`${fis[0].type.split('/')[1]}形式は選択できません`, colors.pink)
      return
    }
    ssFiLab(`${fis[0].name} が選択されました`, colors.skyblue)
  }

  handleEdit(e, bool, ti, des, pn) {
    e.stopPropagation()
    this.fileInput.value = null
    this.setState({
      tiVal: ti || '',
      taVal: des || '',
      fiLab: {
        msg: bool ? '更新する画像を選択してください' : '画像ファイルを選択してください',
        col: colors.lime
      },
      edit: {
        target: pn || '',
        isEdit: bool
      },
      status: { msg: '', isOk: false }
    })
  }

  refreshStates(status, body, msg) {
    const updateGallaryData = this.props.pass.updateGallaryData
    if (!status) {
      this.setState({ status: { msg: body, isOk: false } })
      return
    }
    updateGallaryData(body)
    this.setState({
      tiVal: '',
      taVal: '',
      fiLab: { msg: '画像ファイルを選択してください', col: colors.lime },
      edit: { target: '', isEdit: false },
      status: { msg: msg, isOk: true }
    })
  }

  async upload() {
    const refreshStates = this.refreshStates
    const { tiVal, taVal } = this.state
    const fi = this.fileInput.files[0]
    if (!tiVal || !taVal || !fi) {
      this.setState({
        status: {
          msg: `
            ${tiVal ? '' : 'タイトルを入力して下さい。'}
            ${taVal ? '' : '解説を入力して下さい。'}
            ${fi ? '' : '画像を選択して下さい。'}
          `,
          isOk: false
        }
      })
      return
    }
    const fd = new FormData()
    fd.append('ti', tiVal)
    fd.append('des', taVal)
    fd.append('pic', fi)
    const { status, body } = await fetchApi('uploadPicture', fd)
    refreshStates(status, body, 'アップロードを完了しました')
  }

  async update() {
    const refreshStates = this.refreshStates
    const { tiVal, taVal, edit } = this.state
    const fi = this.fileInput.files[0]
    if (!tiVal || !taVal) {
      this.setState({
        status: {
          msg: `
            ${tiVal ? '' : 'タイトルを入力して下さい。'}
            ${taVal ? '' : '解説を入力して下さい。'}
          `,
          isOk: false
        }
      })
      return
    }
    const fd = new FormData()
    fd.append('ti', tiVal)
    fd.append('des', taVal)
    fd.append('pn', edit.target)
    if (fi) {
      fd.append('pic', fi)
    }
    const { status, body } = await fetchApi('updatePicture', fd)
    refreshStates(status, body, '更新を完了しました')
  }

  async deletePic() {
    const refreshStates = this.refreshStates
    const tpn = this.state.edit.target
    const { status, body } = await fetchApi('deletePicture', { tpn })
    refreshStates(status, body, '削除を完了しました')
  }

  render() {
    const { isLogin, galleryData } = this.props.pass
    const { tiVal, taVal, fiLab, edit, status, fsp } = this.state
    const { toglleFullScreenPic, handleInputsChange, handleEdit, upload, deletePic, update } = this
    const isCancel = tiVal !== '' || taVal !== '' || fiLab.col !== colors.lime || status.msg !== ''

    const boxs = galleryData.map(obj => {
      const { title: ti, description: des, pictureName: pn } = obj
      return (
        <Box key={pn.slice(0, -4)} url={`./gallery/${pn}`} onClick={() => toglleFullScreenPic(obj)}>
          {isLogin && <sc.Button onClick={e => handleEdit(e, true, ti, des, pn)}>編集</sc.Button>}
          <br />
          <PicTitle>{ti}</PicTitle>
        </Box>
      )
    })

    return (
      <Wrapper>
        {fsp.isShown && <FullScreenPic pass={{ picInfo: fsp.picInfo, toglleFullScreenPic }} />}
        <sc.H1>ヤスコロリ画廊</sc.H1>
        {isLogin && (
          <FormAria>
            {status.msg !== '' && <StatusMsg status={status} />}
            <p>タイトル</p>
            <sc.Input
              type="text"
              name="ti"
              size="30"
              value={tiVal}
              onChange={e => handleInputsChange(e)}
            />
            <p>解説</p>
            <Textarea
              name="ta"
              cols="35"
              rows="4"
              value={taVal}
              onChange={e => handleInputsChange(e)}
            />
            <br />
            <FileInputLabel fileInputColor={fiLab.col}>
              {fiLab.msg}
              <input
                type="file"
                style={{ display: 'none' }}
                ref={input => (this.fileInput = input)}
                onChange={() => this.handleFileInputChanage()}
              />
            </FileInputLabel>
            <br />
            {edit.isEdit || <sc.Button onClick={() => upload()}>追加</sc.Button>}
            {edit.isEdit && <sc.Button onClick={() => update()}>更新</sc.Button>}
            {edit.isEdit && <sc.Button onClick={() => deletePic()}>削除</sc.Button>}
            {isCancel && <sc.Button onClick={e => handleEdit(e, false)}>キャンセル</sc.Button>}
          </FormAria>
        )}
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

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 1vw 3vw;
  margin-bottom: 3vw;
  box-shadow: ${properties.boxShadow()};
  cursor: pointer;
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

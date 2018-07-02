import React from 'react'
import styled from 'styled-components'
import common from '../common/commonIndex'
const {
  StatusMsg,
  helpers: { fetchApi },
  styles: { sc }
} = common

class AdminLogIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      textValue: '',
      passValue: '',
      status: { msg: '', isOk: false }
    }
    this.handleInputsChange = this.handleInputsChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleInputsChange(e) {
    const { name, value } = e.target
    this.setState({ [`${name}Value`]: value })
  }

  async login(signin) {
    const url = signin || 'logIn'
    const { textValue: tv, passValue: pv } = this.state
    const handleLogin = this.props.pass.handleLogin
    const isUnOk = /^[a-zA-Z\d]{4,}$/.test(tv)
    const isPwOk = /^[a-zA-Z\d-_~#$%&@:;*+?!,.¥]{8,}$/.test(pv)

    if (!isUnOk || !isPwOk) {
      this.setState({
        status: {
          msg: `
            ${isUnOk ? '' : 'ユーザーネームが不正です。'}
            ${isPwOk ? '' : 'パスワードが不正です。'}
          `,
          isOk: false
        }
      })
      return
    }

    const { status, body } = await fetchApi(url, { un: tv, pw: pv })
    if (!status) {
      this.setState({ status: { msg: body, isOk: false } })
      return
    }
    handleLogin(true)
    this.setState({
      textValue: '',
      passValue: ''
    })
  }

  render() {
    const { isLogin, handleLogin } = this.props.pass
    const { textValue, passValue, status } = this.state
    const { handleInputsChange, login } = this
    return (
      <div>
        {status.msg && <StatusMsg status={status} />}
        <sc.H1>管理者ログイン</sc.H1>
        <FlexContainer>
          {isLogin ? (
            <sc.Button onClick={() => handleLogin(false)}>ログアウト</sc.Button>
          ) : (
              <div>
                <p>ユーザー名</p>
                <sc.Input
                  type="text"
                  name="text"
                  size="30"
                  value={textValue}
                  onChange={e => handleInputsChange(e)}
                />
                <p>パスワード</p>
                <sc.Input
                  type="password"
                  name="pass"
                  size="30"
                  value={passValue}
                  onChange={e => handleInputsChange(e)}
                />
                <sc.Button onClick={() => login()}>ログイン</sc.Button>
                <sc.Button onClick={() => login('signUp')}>新規登録</sc.Button>
              </div>
            )}
        </FlexContainer>
      </div>
    )
  }
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

export default AdminLogIn

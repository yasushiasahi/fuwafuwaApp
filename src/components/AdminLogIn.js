import React from 'react'
import styled from 'styled-components'
import { sc } from './styles.js'
import { fetchApi } from './helpers.js'

const AdminLogIn = ({
  passToAdminLogIn: { userName, password, handleInputsChange, changeState }
}) => {
  const apiLogInOrSignIn = async url => {
    if (!/^[a-zA-Z\d]{4,}$/.test(userName) || !/^[a-zA-Z\d-_~#$%&@:;*+?!,.¥]{8,}$/.test(password)) {
      let prevErrorMessege = ''
      prevErrorMessege += /^[a-zA-Z\d]{4,}$/.test(userName) ? '' : 'ユーザーネームが不正です。'
      prevErrorMessege += /[a-zA-Z\d-_~#$%&@:;*+?!,.¥]{8,}$/.test(password)
        ? ''
        : 'パスワードが不正です。'
      changeState('errorMessage', prevErrorMessege)
      return
    }
    const { status, body } = await fetchApi(url, { userName, password })
    if (!status) {
      changeState('errorMessage', body)
      return
    }
    document.cookie = `userName=${body.userName}`
    document.cookie = `token=${body.token}`
    changeState('errorMessage', '')
    changeState('isLogIn', true)
    ///location.hash = '#Home'
  }

  return (
    <Wrapper>
      <sc.H1>管理者ログイン</sc.H1>
      <p>ユーザー名</p>
      <sc.Input
        type="text"
        name="userName"
        size="30"
        value={userName}
        onChange={e => handleInputsChange(e)}
      />
      <p>パスワード</p>
      <sc.Input
        type="password"
        name="password"
        size="30"
        value={password}
        onChange={e => handleInputsChange(e)}
      />
      <sc.Button onClick={() => apiLogInOrSignIn('logIn')}>ログイン</sc.Button>
      <sc.Button onClick={() => apiLogInOrSignIn('signIn')}>新規登録</sc.Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 2vw;
`

export default AdminLogIn

import React from 'react'
import styled from 'styled-components'
import MenuBox from './MenuBox.js'
import { colors, sc } from './styles.js'


const Menu = () => {
  const menus = [
    {product:'若くなるヘッドスパ', price:'4,860円~'},
    {product:'時を駆けるヘッドスパ（60分）', price:'10,800円~'},
  ]

  return (
    <Container>
      <Wrappar>
        <sc.H1>メニュー</sc.H1>
        <MenuBox
          head='ヘッドスパ'
          explain='美しい発色と長い色持ちのフワフワ!美容室自慢のカラー'
          menus={menus}/>
        <MenuBox
          head='カラー'
          explain='独自のメソッドと技術で、明るく美しい髪色に'
          menus={[
            {product:'明るい白髪染め', price:'5,940円~'},
            {product:'明るい白髪染め~初級編', price:'10,260円~'},
          ]}/>
      </Wrappar>
    </Container>
  )
}

const Container = styled.div`
  background: ${colors.lemon};
  padding-top: 4vw;
`

const Wrappar = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 2vw;
  background: ${colors.cream};
`


export default Menu

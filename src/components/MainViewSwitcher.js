import React from 'react'
import styled from 'styled-components'


const MainViewSwitcher = ({
  handleMainView,
  isColumn,
}) => (
  <Ul
    isColumn={isColumn}>
    <li
      onClick={() => handleMainView('Home')}>ホーム</li>
    <li
      onClick={() => handleMainView('Greeting')}>ご挨拶</li>
    <li
      onClick={() => handleMainView('SalonInfo')}>お店情報</li>
    <li
      onClick={() => handleMainView('Menu')}>メニュー</li>
    <li
      onClick={() => handleMainView('BlogIndex')}>ブログ</li>
    <li
      onClick={() => handleMainView('Gallery')}>画廊</li>
  </Ul>
)


const Ul = styled.ul`
  list-style: none;
  cursor: pointer;
  user-select: none;
  li {
      user-select: none;
      margin-bottom: 2vw;
  }
  ${props => props.isColumn && (`
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    li {
      margin-bottom: 0;
    }
  `)}
`

export default MainViewSwitcher

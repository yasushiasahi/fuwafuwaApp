import React from 'react'
import styled from 'styled-components'


const MainViewSwitcher = ({
  handleMainView,
  isHome = false,
  isFromSidebar = false,
  isColumn = false,
}) => (
  <Ul
    isColumn={isColumn}>
    {isHome || (
      <li
        onClick={() => handleMainView('Home', isFromSidebar)}>ホーム</li>
    )}
    <li
      onClick={() => handleMainView('Greeting', isFromSidebar)}>ご挨拶</li>
    <li
      onClick={() => handleMainView('SalonInfo', isFromSidebar)}>お店情報</li>
    <li
      onClick={() => handleMainView('Menu', isFromSidebar)}>メニュー</li>
    <li
      onClick={() => handleMainView('BlogIndex', isFromSidebar)}>ブログ</li>
    <li
      onClick={() => handleMainView('Gallery', isFromSidebar)}>画廊</li>
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
  ${props => (props.isColumn && `
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

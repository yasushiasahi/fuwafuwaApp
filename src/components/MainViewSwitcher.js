import React from 'react'
import styled from 'styled-components'


const MainViewSwitcher = ({
  handleMainView,
  isParentHome = false,
  isParentSidebar = false,
  isColumn = false,
}) => (
  <Ul
    isColumn={isColumn}>
    {isParentHome || (
      <li
        onClick={() => handleMainView('Home', isParentSidebar, isParentHome)}>ホーム</li>
    )}
    <li
      onClick={() => handleMainView('Greeting', isParentSidebar, isParentHome)}>ご挨拶</li>
    <li
      onClick={() => handleMainView('SalonInfo', isParentSidebar, isParentHome)}>お店情報</li>
    <li
      onClick={() => handleMainView('Menu', isParentSidebar, isParentHome)}>メニュー</li>
    <li
      onClick={() => handleMainView('BlogIndex', isParentSidebar, isParentHome)}>ブログ</li>
    <li
      onClick={() => handleMainView('Gallery', isParentSidebar, isParentHome)}>画廊</li>
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

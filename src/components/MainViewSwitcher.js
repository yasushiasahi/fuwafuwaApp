import React from 'react'
import styled from 'styled-components'


const MainViewSwitcher = ({
  handleHomeLinkClick,
  switchMainView,
  isParentHome = false,
  isParentSidebar = false,
  isColumn = false,
}) => (
  <Ul
    isColumn={isColumn}>
    {isParentHome || (
      <li
        onClick={() => handleHomeLinkClick(isParentSidebar)}>ホーム</li>
    )}
    <li
      onClick={() => switchMainView('Greeting', isParentSidebar, isParentHome)}>ご挨拶</li>
    <li
      onClick={() => switchMainView('SalonInfo', isParentSidebar, isParentHome)}>お店情報</li>
    <li
      onClick={() => switchMainView('Menu', isParentSidebar, isParentHome)}>メニュー</li>
    <li
      onClick={() => switchMainView('BlogIndex', isParentSidebar, isParentHome)}>ブログ</li>
    <li
      onClick={() => switchMainView('Gallery', isParentSidebar, isParentHome)}>画廊</li>
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

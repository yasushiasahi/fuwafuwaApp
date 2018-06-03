import React from 'react'
import styled from 'styled-components'
import { properties } from './styles.js'
import homu from './../images/assets/ho-mu.svg'
import burogu from './../images/assets/burogu.svg'
import garou from './../images/assets/garou.svg'
import goaisatsu from './../images/assets/goaisatsu.svg'
import menyu from './../images/assets/menyu.svg'
import omisezyouhou from './../images/assets/omisezyouhou.svg'

const MainViewSwitcher = ({
  switchMainView,
  isParentHome = false,
  isParentSidebar = false,
  isColumn = false
}) => (
    <Ul isColumn={isColumn}>
      {isParentHome || (
        <li onClick={() => switchMainView('Home', isParentSidebar, isParentHome)}>
          <img src={homu} />
        </li>
      )}
      <li onClick={() => switchMainView('Greeting', isParentSidebar, isParentHome)}>
        <img src={goaisatsu} />
      </li>
      <li onClick={() => switchMainView('SalonInfo', isParentSidebar, isParentHome)}>
        <img src={omisezyouhou} />
      </li>
      <li onClick={() => switchMainView('Menu', isParentSidebar, isParentHome)}>
        <img src={menyu} />
      </li>
      <li onClick={() => switchMainView('BlogIndex', isParentSidebar, isParentHome)}>
        <img src={burogu} />
      </li>
      <li onClick={() => switchMainView('Gallery', isParentSidebar, isParentHome)}>
        <img src={garou} />
      </li>
    </Ul>
  )

const Ul = styled.ul`
  list-style: none;
  cursor: pointer;
  user-select: none;
  li {
    user-select: none;
    margin-bottom: 2vw;
    img {
      box-shadow: ${properties.boxShadow()};
    }
  }
  ${props =>
    props.isColumn &&
    `
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    li {
      margin-bottom: 0;
    }
  `};
`

export default MainViewSwitcher

import React from 'react'
import styled from 'styled-components'
import { properties } from './styles.js'
import homu from './../images/assets/ho-mu.svg'
import burogu from './../images/assets/burogu.svg'
import garou from './../images/assets/garou.svg'
import goaisatsu from './../images/assets/goaisatsu.svg'
import menyu from './../images/assets/menyu.svg'
import omisezyouhou from './../images/assets/omisezyouhou.svg'

const MainViewSwitcher = ({ isColumn = false }) => {
  const linkContents = [
    { componentName: 'Home', src: homu, alt: 'ホームリンク' },
    { componentName: 'Greeting', src: goaisatsu, alt: 'ご挨拶リンク' },
    { componentName: 'SalonInfo', src: omisezyouhou, alt: 'お店情報リンク' },
    { componentName: 'Menu', src: menyu, alt: 'メニューリンク' },
    { componentName: 'BlogIndex', src: burogu, alt: 'ブログリンク' },
    { componentName: 'Gallery', src: garou, alt: '画廊リンク' }
  ]

  const links = linkContents.map(linkObj => {
    return (
      <li
        key={linkObj.componentName}
        onClick={() => {
          location.hash = `#${linkObj.componentName}`
        }}>
        <img src={linkObj.src} alt={linkObj.alt} />
      </li>
    )
  })

  return <Ul isColumn={isColumn}>{links}</Ul>
}

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

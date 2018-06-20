import React from 'react'
import styled from 'styled-components'
import Link from './Link.js'
import homu from './../images/assets/ho-mu.svg'
import burogu from './../images/assets/burogu.svg'
import garou from './../images/assets/garou.svg'
import goaisatsu from './../images/assets/goaisatsu.svg'
import menyu from './../images/assets/menyu.svg'
import omisezyouhou from './../images/assets/omisezyouhou.svg'

const MainViewSwitcher = () => (
  <Ul>
    <Link componentName="Home" src={homu} alt="ホームリンク" />
    <Link componentName="Greeting" src={goaisatsu} alt="ご挨拶リンク" />
    <Link componentName="SalonInfo" src={omisezyouhou} alt="お店情報リンク" />
    <Link componentName="Menu" src={menyu} alt="メニューリンク" />
    <Link componentName="BlogIndex" src={burogu} alt="ブログリンク" />
    <Link componentName="Gallery" src={garou} alt="画廊リンク" />
  </Ul>
)

const Ul = styled.ul`
  cursor: pointer;
  user-select: none;
`

export default MainViewSwitcher

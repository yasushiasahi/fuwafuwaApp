import React from 'react'
import styled from 'styled-components'
import Link from './Link.js'
import homu from './../images/assets/ho-mu.svg'
import burogu from './../images/assets/burogu.svg'
import garou from './../images/assets/garou.svg'
import goaisatsu from './../images/assets/goaisatsu.svg'
import menyu from './../images/assets/menyu.svg'
import omise from './../images/assets/omisezyouhou.svg'

const h = location.hash.slice(1)

const MainViewSwitcher = () => (
  <Ul>
    {h === 'Home' ? null : <Link componentName="Home" src={homu} alt="ホームリンク" />}
    {h === 'Greeting' ? null : <Link componentName="Greeting" src={goaisatsu} alt="ご挨拶リンク" />}
    {h === 'SalonInfo' ? null : <Link componentName="SalonInfo" src={omise} alt="お店情報リンク" />}
    {h === 'Menu' ? null : <Link componentName="Menu" src={menyu} alt="メニューリンク" />}
    {h === 'BlogIndex' ? null : <Link componentName="BlogIndex" src={burogu} alt="ブログリンク" />}
    {h === 'Gallery' ? null : <Link componentName="Gallery" src={garou} alt="画廊リンク" />}
  </Ul>
)

const Ul = styled.ul`
  cursor: pointer;
  user-select: none;
`

export default MainViewSwitcher

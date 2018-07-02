import React from 'react'
import styled from 'styled-components'
import Link from './Link.js'
import images from '../../../images/imageIndex'
const {
  assets: { lns }
} = images

const LinkButtons = () => (
  <Ul>
    <Link componentName="Home" src={lns.homu} alt="ホームリンク" />
    <Link componentName="Greeting" src={lns.goaisatsu} alt="ご挨拶リンク" />
    <Link componentName="SalonInfo" src={lns.omisezyouhou} alt="お店情報リンク" />
    <Link componentName="BrightHairDye" src={lns.shiraga} alt="明るい白髪染めリンク" />
    <Link componentName="Menu" src={lns.menyu} alt="メニューリンク" />
    <Link componentName="BlogIndex" src={lns.burogu} alt="ブログリンク" />
    <Link componentName="Gallery" src={lns.garou} alt="画廊リンク" />
  </Ul>
)

const Ul = styled.ul`
  cursor: pointer;
  user-select: none;
`

export default LinkButtons

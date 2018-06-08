import React from 'react'
import MenuBox from './MenuBox.js'
import { sc } from './styles.js'
import image_01 from './../images/menu/01_image.jpg'

const Menu = () => (
  <div>
    <sc.H1>メニュー</sc.H1>
    <sc.Img src={image_01} />
    <MenuBox
      head="カット"
      explain="ドライカットを基本に骨格や髪質を考慮して丁寧にカットします"
      menus={[{ product: 'カット', price: '5,400円~' }]}
    />
    <MenuBox
      head="ヘッドスパ"
      explain="美しい発色と長い色持ちのフワフワ!美容室自慢のカラー"
      menus={[
        { product: '若くなるヘッドスパ', price: '4,860円~' },
        { product: '時を駆けるヘッドスパ（60分）', price: '10,800円~' }
      ]}
    />
    <MenuBox
      head="カラー"
      explain="独自のメソッドと技術で、明るく美しい髪色に"
      menus={[
        { product: '明るい白髪染め', price: '5,940円~' },
        { product: '明るい白髪染め~初級編', price: '10,260円~' }
      ]}
    />
  </div>
)

export default Menu

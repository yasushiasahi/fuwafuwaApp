import React from 'react'
import styled from 'styled-components'
import { colors } from './styles.js'

const MenuBox = (props) => {
  const {
    menus,
    head,
    explain
  } = props

  const menuList = menus.map((menu, index) =>  {
    return (
      <MenuWrappar
        key={index}>
        <Product>{menu.product}</Product>
        <Price>{menu.price}</Price>
      </MenuWrappar>
    )
  })

  return (
    <Container>
      <HeadWrappar>
        <Head>{head}</Head>
        <Explain>{explain}</Explain>
      </HeadWrappar>
      {menuList}
    </Container>
  )
}

const Container = styled.div`
  margin: 6vw 0;
`

const HeadWrappar = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: auto;
  align-items: center;
  border-bottom: 1px solid ${colors.black};
`

const Head = styled.h2`
  margin: 0;
  font-size: 5vw;
  color: ${colors.pink};
`

const Explain = styled.div`
  font-size: 3vw;
`

const MenuWrappar = styled.div`
  display: grid;
  grid-template-columns: 5% 70% 20% 5%;
  grid-template-rows: auto;
  grid-template-areas:
    ". product price .";
  margin: 2vw 0;
`

const Product = styled.div`
  grid-area: product;
  font-size: 4vw;
  font-weight: bold;
  color: ${colors.blue}
`

const Price = styled.div`
  grid-area: price;
  justify-self: end;
  font-size: 3.5vw;
`


export default MenuBox

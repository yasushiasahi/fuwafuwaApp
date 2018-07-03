import React from 'react'
import styled from 'styled-components'
import common from '../common/commonIndex'
const {
  styles: { media, colors }
} = common

const MenuBox = ({ menus, head, explain }) => {
  const menuList = menus.map((menu, index) => {
    return (
      <MenuWrappar key={index}>
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

  ${media.desktop`
    margin: 40px 0;
  `};
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

  ${media.desktop`
    font-size: 30px;
  `};
`

const Explain = styled.div`
  font-size: 3vw;

  ${media.desktop`
    font-size: 20px;
  `};
`

const MenuWrappar = styled.div`
  display: grid;
  grid-template-columns: 5% 70% 20% 5%;
  grid-template-rows: auto;
  grid-template-areas: '. product price .';
  margin: 2vw 0;
`

const Product = styled.div`
  grid-area: product;
  font-size: 4vw;
  font-weight: bold;
  color: ${colors.blue};

  ${media.desktop`
    font-size: 30px;
  `};
`

const Price = styled.div`
  grid-area: price;
  justify-self: end;
  font-size: 3.5vw;

  ${media.desktop`
    font-size: 30px;
  `};
`

export default MenuBox

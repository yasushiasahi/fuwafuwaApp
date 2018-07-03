import React from 'react'
import styled from 'styled-components'
import common from '../common/commonIndex'
const {
  styles: { media, colors, sc, properties }
} = common

const BlogIndex = ({ pass: { blogFeeds, toggleBlogBoxOpen } }) => {
  const Blogs = blogFeeds.map(blogInfo => {
    const { id, title, isOpen, date, description, link } = blogInfo
    const dateStr = date.slice(0, 10)
    const isMoreThan20Charas = title.length > 20
    const biginningWithoutSpaces = description.replace(/\s+/g, '').slice(0, 60) + '...　'
    return (
      <Box key={id} isOpen={isOpen}>
        <TitleWrappar onClick={() => toggleBlogBoxOpen(id)}>
          <Title isMoreThan20Charas={isMoreThan20Charas}>{title}</Title>
          <Date>{dateStr}</Date>
        </TitleWrappar>
        <Description isOpen={isOpen}>
          {biginningWithoutSpaces}
          <Link href={link} rel="noopener noreferrer" target="_blank">
            ブログへ移動
          </Link>
        </Description>
      </Box>
    )
  })

  return (
    <div>
      <sc.H1>最近のブログ一覧</sc.H1>
      <P>
        <a href="https://fuwafuwayo.exblog.jp/">エキサイトブログ</a>誠意更新中！！
      </P>
      <GridContainer>{Blogs}</GridContainer>
    </div>
  )
}

const P = sc.P.extend`
  font-size: 5vw;
  text-align: center;

  ${media.desktop`
    font-size: 2rem;
  `};
`

const GridContainer = styled.div`
  background: ${colors.cream};
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-rows: 20.25vw;
  grid-gap: 2vw;

  ${media.desktop`
    grid-auto-rows: 175px;
    grid-gap: 20px;
  `};
`

const Box = styled.div`
  grid-row: ${props => (props.isOpen ? 'span 2' : 'span 1')};
  height: ${props => (props.isOpen ? '42.5vw' : '20.25vw')};
  background-color: ${colors.lime};
  transition: ${props => (props.isOpen ? '.5s' : '0s')};
  box-shadow: ${properties.boxShadow()};

  ${media.desktop`
    height: ${props => (props.isOpen ? '370px' : '175px')};
  `};
`

const TitleWrappar = styled.div`
  background-color: ${colors.skyblue};
  height: 20.25vw;
  padding: 1vw;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 80% 20%;
  grid-template-areas:
    'title'
    'date';
  align-items: center;
  cursor: pointer;

  ${media.desktop`
    height: 175px;
  `};
`

const Title = styled.div`
  grid-area: title;
  overflow: hidden;
  font-size: ${props => (props.isMoreThan20Charas ? '3.5vw' : '4.6vw')};
  line-height: ${props => (props.isMoreThan20Charas ? '5vw' : '5.6vw')};

  ${media.desktop`
    font-size: ${props => (props.isMoreThan20Charas ? '30px' : '40px')};
    line-height: ${props => (props.isMoreThan20Charas ? '40px' : '50px')};
  `};
`

const Date = styled.div`
  grid-area: date;
  font-size: 3vw;

  ${media.desktop`
    font-size: 15px;
  `};
`

const Description = styled.div`
  padding: ${props => (props.isOpen ? '1.2vw 1vw' : '0 1vw')};
  font-size: 3vw;
  line-height: 4vw;
  overflow: hidden;
  height: ${props => (props.isOpen ? '22.25vw' : '0')};
  transition: ${props => (props.isOpen ? 'height .5s' : '0s')};
  box-shadow: ${properties.boxShadow(true)};
  box-sizing: border-box;

  ${media.desktop`
    font-size: 1.5rem;
    line-height: 2rem;
    height: ${props => (props.isOpen ? '195px' : '0')};
  `};
`

const Link = styled.a`
  font-size: 3vw;

  ${media.desktop`
    font-size: 15px;
  `};
`

export default BlogIndex

import React from 'react'
import styled from 'styled-components'
import { colors, sc, properties } from './styles.js'




const BlogIndex = ({
  blogInfos,
  toggleBlogBoxOpen
}) => {
  const Blogs = blogInfos.map((blogInfo) => {
    const {
      id,
      title,
      isOpen,
      date,
      description,
      link
    } = blogInfo
    const dateStr = date.slice(0,10)
    const isMoreThan20Charas = title.length > 20
    const biginningWithoutSpaces = description.replace(/\s+/g, "").slice(0,60) + '...　'

    return (
      <Box
        key={id}
        isOpen={isOpen}>
        <TitleWrappar onClick={() => toggleBlogBoxOpen(id)}>
          <Title isMoreThan20Charas={isMoreThan20Charas}>{title}</Title>
          <Date>{dateStr}</Date>
        </TitleWrappar>
        <Description isOpen={isOpen}>
          {biginningWithoutSpaces}
          <Link href={link}>ブログへ移動</Link>
        </Description>
      </Box>
    )
  })

  return (
    <Wrappar>
      <sc.H1>最近のブログ一覧</sc.H1>
      <GridContainer>
        {Blogs}
      </GridContainer>
    </Wrappar>
  )
}



const Wrappar = styled.div`
  padding: 2vw;
`

const GridContainer = styled.div`
  background: ${colors.cream};
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto auto;
  grid-auto-rows: 20.25vw;
  grid-gap: 2vw;
`

const Box = styled.div`
  grid-row: ${props => props.isOpen ? 'span 2' : 'span 1'};
  height: ${props => props.isOpen ? '42.5vw' : '20.25vw'};
  background-color: ${colors.lime};
  transition: ${props => props.isOpen ? '.5s' : '0s'};
  box-shadow: ${properties.boxShadow()};
`

const TitleWrappar = styled.div`
  background-color: ${colors.skyblue};
  height: 20.25vw;
  padding: 1vw;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 80% 20%;
  grid-template-areas:
    "title"
    "date";
  align-items: center;
`

const Title = styled.div`
  grid-area: title;
  overflow: hidden;
  font-size: ${props => props.isMoreThan20Charas ? '3.5vw' : '4.6vw'};
  line-height: ${props => props.isMoreThan20Charas ? '5vw' : '5.6vw'};
`

const Date = styled.div`
  grid-area: date;
  font-size: 3vw;
`

const Description = styled.div`
  padding: ${props => props.isOpen ? '1.2vw 1vw' : '0 1vw'};
  font-size: 3vw;
  line-height: 4vw;
  overflow: hidden;
  height: ${props => props.isOpen ? '22.25vw' : '0'};
  transition: ${props => props.isOpen ? 'height .5s' : '0s'};
  box-shadow: ${properties.boxShadow(true)};
  box-sizing: border-box;
`

const Link = styled.a`
  font-size: 3vw;
`

export default BlogIndex

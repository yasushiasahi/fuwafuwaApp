import React from 'react'
import styled from 'styled-components'
import { colors, sc } from './styles.js'


class BlogIndex extends React.Component {
  constructor() {
    super()
    this.state = ({
      blogs: [],
    })
    this.hundleBlogClick = this.hundleBlogClick.bind(this)
  }

  componentDidMount() {
    let url = `https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cdate%2Clink%2Cdescription%20from%20rss%20where%20url%3D'https%3A%2F%2Ffuwafuwayo.exblog.jp%2Findex.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        const provBlogs = resJson.query.results.item.map((obj, index) => {
          obj.id = index
          obj.isOpen = false
          return obj
        })
        this.setState({
          blogs: provBlogs
        })
      })
      .catch(error => {
        console.log(`エラー:${error}`);
      });
  }

  hundleBlogClick (id) {
    const provBlogs = this.state.blogs.map(blogObj => {
      const blogObjCopy = Object.assign({}, blogObj)
      if (blogObjCopy.id === id) blogObjCopy.isOpen = !blogObjCopy.isOpen
      return blogObjCopy
    })
    this.setState({
      blogs: provBlogs
    })
  }

  render() {
    const Blogs = this.state.blogs.map((blogObj) => {
      const {
        id,
        title,
        isOpen,
        date,
        description,
        link
      } = blogObj
      const dateStr = date.slice(0,10)
      const isMoreThan20Charas = title.length > 20
      const biginningWithoutSpaces = description.replace(/\s+/g, "").slice(0,60) + '...　'

      return (
        <Box
          key={id}
          isOpen={isOpen}>
          <TitleWrappar onClick={() => this.hundleBlogClick(id)}>
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
      <Container>
        <Wrappar>
          <sc.H1>最近のブログ一覧</sc.H1>
          <GridContainer>
            {Blogs}
          </GridContainer>
        </Wrappar>
      </Container>
    )
  }
}

const Wrappar = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 2vw;
  background: ${colors.cream};
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
  box-shadow: 0 .3vw .6vw 0 rgba(0,0,0,.6);
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
  box-shadow: inset 0 .3vw .6vw 0 rgba(0,0,0,.6);
  box-sizing: border-box;
`

const Link = styled.a`
  font-size: 3vw;
`

const Container = styled.div`
  background: ${colors.lemon};
  padding-top: 4vw;
`

export default BlogIndex

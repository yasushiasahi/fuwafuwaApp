import React from 'react'
import styled from 'styled-components'

class Blog extends React.Component {
  constructor() {
    super()
    this.state = ({
      blogs: [],
      clickedIndex: NaN
    })
    this.hundleClick = this.hundleClick.bind(this)
  }

  componentDidMount() {
    let url = `https://query.yahooapis.com/v1/public/yql?q=select%20title%2Cdate%2Clink%2Cdescription%20from%20rss%20where%20url%3D'https%3A%2F%2Ffuwafuwayo.exblog.jp%2Findex.xml'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys`
    fetch(url)
      .then(res => res.json())
      .then(resJson => {
        const provBlogs = resJson.query.results.item
        this.setState({
          blogs: provBlogs
        })
      })
      .catch(error => {
        console.log(`エラー:${error}`);
      });
  }

  hundleClick (index) {
    if (this.state.clickedIndex !== index) {
      this.setState({
        clickedIndex: index
      })
    } else {
      this.setState({
        clickedIndex: NaN
      })
    }
  }

  render() {
    const nowLoading = <p>なうろーでぃんぐ</p>;
    const blogContents = this.state.blogs.map((blog, index) => {
      const dateStr = blog.date.match(/^\d{4}-\d{2}-\d{2}/)[0]
      const contentStr = blog.description.slice(0, 86) + '...'
      const blogHeadAndLink = (
        <Content>
          {contentStr}
          <Button
            href={blog.link}>
            excite blogへ移動
          </Button>
        </Content>
      )
      const isLong = blog.title.length > 16
      const isClicked = this.state.clickedIndex === index
      return (
        <GridItem
          key={index}
          isClicked={isClicked}>
          <TitleWrapper>
            <TitleInner
              onClick={() => this.hundleClick(index)}>
              <Title
                isLong={isLong}>
                {blog.title}
              </Title>
              <Date>
                {dateStr}
              </Date>
              <BottomBoder isClicked={isClicked}/>
              <RightBoder isClicked={isClicked}/>
              <TopBoder isClicked={isClicked}/>
              <LeftBoder isClicked={isClicked}/>
            </TitleInner>
          </TitleWrapper>
          {isClicked && blogHeadAndLink}
        </GridItem>
      )
    })

    return (
      <GridContainer>
        {blogContents.length ? blogContents : nowLoading}
      </GridContainer>
    )
  }
}

const BaseBoder = styled.div`
  content: '';
  position: absolute;
  background: #000;
  transition: all .5s;
`

const BottomBoder = BaseBoder.extend`
  bottom: 0;
  left: ${props => (props.isClicked ? '0px' : ' -30vw')};
  width: 30vw;
  height: 1px;
`

const RightBoder = BaseBoder.extend`
  bottom: ${props => (props.isClicked ? '0px' : '-30vw')};
  right: 0;
  width: 1px;
  height: 30vw;
`

const TopBoder = BaseBoder.extend`
  top: 0;
  right: ${props => (props.isClicked ? '0px' : '-30vw')};
  width: 30vw;
  height: 1px;
`

const LeftBoder = BaseBoder.extend`
  top: ${props => (props.isClicked ? '0px' : '-30vw')};
  left: 0;
  width: 1px;
  height: 30vw;
`

const GridContainer = styled.section`
  display: grid;
  grid-template-columns: 30vw 30vw 30vw;
  grid-template-rows: 30vw 30vw 30vw 30vw 30vw 30vw 30vw;
  justify-content: center;
  align-content: center;
  grid-gap: 2vw;
`

const GridItem = styled.div`
  grid-area: ${props => (props.isClicked ? 'span 2 / span 2' : 'span 1 / span 1')};
  width: ${props => (props.isClicked ? '62vw' : '30vw')};
  height: ${props => (props.isClicked ? '62vw' : '30vw')};
  background: pink;
  overflow: hidden;
  padding: 0.8rem;
  transition: all .5s ease;
`

const TitleWrapper = styled.div`
  float: left;
  width: 30vw;
  height: 30vw;
  position: relative;
`

const TitleInner = styled.div`
  background: yellow;
  width: 30vw;
  height: 30vw;
  grid-template-columns: 28vw;
  grid-template-rows: 25vw 3vw;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -0.8rem;
  left: -0.8rem;
  display: grid;
  overflow: hidden;
`

const Title = styled.p`
  font-size: ${props => (props.isLong ? '1.6rem' : '2rem')};
  line-height: ${props => (props.isLong ? '1.8rem' : '2.5rem')};
`

const Date = styled.p`
  font-size: 1rem;
`

const Content = styled.span`
  font-size: 1.4rem;
  line-height: 2.3rem;
  padding: 1.2rem;
`

const Button = styled.a`
margin-left: 1.5rem;
font-size: 1.2rem;
`

export default Blog

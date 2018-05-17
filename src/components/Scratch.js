import React from 'react'
import styled from 'styled-components'
import { colors, sc } from './styles.js'


class Scratch extends React.Component {
  constructor() {
    super()
    this.state = ({
      show: false
    })
  }

  render() {
    const conata = <Test show={this.state.show}/>
    return (
      <div>
        {this.state.show ? conata : null}
        {conata}
      </div>
    )
  }
}

const Test = (props) => (
  <Conata show={props.show}>こなた</Conata>
)

const Conata = styled.div`
  background-color: skyblue;
  height: ${props => props.show ? '100px' : '0px'};
  width: 100px;
  transition: 1s;
`


const Exsanple = () => (
  <Container>
    <Wrappar>
      <TitleWrappar>
        <Title>タイトルタイトルタイトルタイトル</Title>
        <Description bool={false}></Description>
        <Date>1294-07-03</Date>
      </TitleWrappar>
    </Wrappar>
  </Container>
)

const TitleWrappar = styled.div`
  background-color: blue;;

  padding: 1vw;
  display: grid;
  grid-template-columns: 50%;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "title"
    "description"
    "date";
  align-items: center;
  box-shadow: 0 .3vw .6vw 0 rgba(0,0,0,.6);
`

const Title = styled.div`
  background-color: lime;
  height: 14.6vw;
  padding: 1.4vw 0;
  grid-area: title;
  font-size: ${props => props.isMoreThan20Charas ? '3.5vw' : '4.6vw'};
  line-height: ${props => props.isMoreThan20Charas ? '5vw' : '5.6vw'};
`

const Date = styled.div`
  background-color: yellow;
  height: 3.65vw;
  grid-area: date;
  font-size: 3vw;
`

const Description = styled.div`
  background-color: red;
  height: ${props => props.bool ? '20vw' : '0'};
  grid-area: description;
  font-size: 3vw;
  line-height: 4vw;
  transition: 1s;
`

const Container = styled.div`
  background: ${colors.lemon};
  padding-top: 4vw;
`

const Wrappar = styled.div`
  width: 95vw;
  margin: 0 auto;
  padding: 2vw;
  background: ${colors.cream};
`

export default Scratch

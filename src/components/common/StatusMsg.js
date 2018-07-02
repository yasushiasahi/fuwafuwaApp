import React from 'react'
import styled from 'styled-components'
import styles from './styles'
const { media, colors } = styles

const StatusMsg = ({ status: { msg, isok } }) => <StMsg isok={isok}>{msg}</StMsg>

const StMsg = styled.p`
  background-color: ${props => (props.isok ? colors.skyblue : colors.pink)};
  color: ${colors.black};
  font-weight: bold;
  padding: 1vw;
  margin-bottom: 3vw;

  ${media.desktop`
    margin: 20px 0;
  `};
`

export default StatusMsg

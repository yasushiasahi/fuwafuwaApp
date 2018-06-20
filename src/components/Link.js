import React from 'react'
import styled from 'styled-components'
import { properties } from './styles.js'

const Link = ({ componentName, src, alt }) => (
  <li
    key={componentName}
    onClick={() => {
      location.hash = `#${componentName}`
    }}>
    <Img src={src} alt={alt} />
  </li>
)

const Img = styled.img`
  box-shadow: ${properties.boxShadow()};
  display: block;
`

export default Link

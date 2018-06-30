import React from 'react'
import styled from 'styled-components'
import { properties } from './styles.js'

const Link = ({ componentName, src, alt }) =>
  location.hash.slice(1) === componentName ? null : (
    <li
      key={componentName}
      onClick={e => {
        e.stopPropagation()
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

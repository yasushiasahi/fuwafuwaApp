import React from 'react'
import styled from 'styled-components'
import styles from '../styles'
const properties = styles.properties

const Link = ({ componentName, src, alt }) =>
  location.hash.slice(1) === componentName ? null : (
    <li
      key={componentName}
      onClick={e => {
        e.stopPropagation()
        location.hash = `#${componentName}`
        window.scroll(0, 0)
      }}>
      <Img src={src} alt={alt} />
    </li>
  )

const Img = styled.img`
  box-shadow: ${properties.boxShadow()};
  display: block;
`

export default Link

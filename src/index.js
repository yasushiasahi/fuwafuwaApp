import React from 'react'
import ReactDom from 'react-dom'
import { injectGlobal } from 'styled-components'
import App from './components/App.js'

injectGlobal`
  body {
    font-family: 'Noto Sans JP', sans-serif;
    background-color: black;
    margin: 0;
    padding: 0;
  }

  div {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  h1 {
    margin: 0;
  }

  input {
    box-sizing: border-box;
  }
`

const rootElement = document.getElementById('root')
ReactDom.render(<App />, rootElement)

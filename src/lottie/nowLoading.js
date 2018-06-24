import lottie from './lottie_light.js'
import data from './data.json'

let body = document.body
let loadingElement = document.createElement('div')
let lottieElement = document.createElement('div')
let link = document.createElement('link')
const loadingElementStyles = {
  backgroundColor: '#ffe866',
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const lottieElementStyles = {
  width: '50%',
  height: '50%'
}

body.style.margin = '0'
for (const property in loadingElementStyles) {
  loadingElement.style[property] = loadingElementStyles[property]
}
for (const property in lottieElementStyles) {
  lottieElement.style[property] = lottieElementStyles[property]
}

loadingElement.appendChild(lottieElement)
body.insertBefore(loadingElement, body.firstChild)

lottie.loadAnimation({
  container: lottieElement,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  animationData: data
})

link.setAttribute('href', 'https://fonts.googleapis.com/earlyaccess/notosansjp.css')
link.setAttribute('rel', 'stylesheet')
document.head.appendChild(link)

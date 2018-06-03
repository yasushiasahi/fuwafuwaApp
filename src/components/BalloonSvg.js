import React from 'react'
import styled, { keyframes } from 'styled-components'

class BalloonSvg extends React.Component {
  constructor(props) {
    super(props)
    this.svg = React.createRef()
    this.handleAnimationStart = this.handleAnimationStart.bind(this)
  }

  handleAnimationStart() {
    this.svg.current.style.opacity = 1
  }

  render() {
    const { top, middle, bottom } = this.props.balloonText

    return (
      <Animation onAnimationStart={() => this.handleAnimationStart()}>
        <svg
          ref={this.svg}
          opacity="0"
          version="1.1"
          x="0px"
          y="0px"
          viewBox="0 0 319.3 218.2"
          enableBackground="new 0 0 319.3 218.2">
          <polygon
            id="path_1_"
            fill="#FFF7CC"
            stroke="#332E14"
            strokeWidth={5}
            points="25.1,177.8 86.6,215.6 236.5,197.2 257.6,167.2 266.1,116.4 317.7,75.7 261.1,90.6 265.1,76.7 261.1,53.8 238.6,12.9 71.7,2.6 2.7,79.2 "
          />
          <rect x="40.9" y="42.1" fill="none" width={196} height={142} />
          <text transform="matrix(0.9976 0 0 1 42.2255 66.8152)" fontSize="40px">
            {top}
          </text>
          <text transform="matrix(0.9976 0 0 1 42.2255 118.6868)" fontSize="40px">
            {middle}
          </text>
          <text transform="matrix(0.9976 0 0 1 42.225 170.6672)" fontSize="40px">
            {bottom}
          </text>
        </svg>
      </Animation>
    )
  }
}

const pop = keyframes`
  0% {
    transform: matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    opacity: 0;
  }
  1.7% { transform: matrix3d(0.147, 0, 0, 0, 0, 0.103, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  3.4% { transform: matrix3d(0.316, 0, 0, 0, 0, 0.299, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  4.7% { transform: matrix3d(0.45, 0, 0, 0, 0, 0.487, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  5.11% {
    transform: matrix3d(0.491, 0, 0, 0, 0, 0.546, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    opacity: 1;
  }
  6.81% { transform: matrix3d(0.659, 0, 0, 0, 0, 0.769, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  8.76% { transform: matrix3d(0.832, 0, 0, 0, 0, 0.932, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  9.41% { transform: matrix3d(0.883, 0, 0, 0, 0, 0.964, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  10.66% { transform: matrix3d(0.972, 0, 0, 0, 0, 1.005, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  12.61% { transform: matrix3d(1.081, 0, 0, 0, 0, 1.047, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.11% { transform: matrix3d(1.141, 0, 0, 0, 0, 1.083, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  14.51% { transform: matrix3d(1.154, 0, 0, 0, 0, 1.094, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.37% { transform: matrix3d(1.212, 0, 0, 0, 0, 1.199, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  18.72% { transform: matrix3d(1.212, 0, 0, 0, 0, 1.205, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  22.22% { transform: matrix3d(1.185, 0, 0, 0, 0, 1.204, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  24.32% { transform: matrix3d(1.151, 0, 0, 0, 0, 1.163, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  29.93% { transform: matrix3d(1.048, 0, 0, 0, 0, 1.042, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  35.54% { transform: matrix3d(0.979, 0, 0, 0, 0, 0.98, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  37.64% { transform: matrix3d(0.967, 0, 0, 0, 0, 0.969, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  41.04% { transform: matrix3d(0.961, 0, 0, 0, 0, 0.961, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  45.35% { transform: matrix3d(0.968, 0, 0, 0, 0, 0.968, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  50% { transform: matrix3d(0.984, 0, 0, 0, 0, 0.984, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  52.15% { transform: matrix3d(0.991, 0, 0, 0, 0, 0.991, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  63.26% { transform: matrix3d(1.007, 0, 0, 0, 0, 1.007, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  85.49% { transform: matrix3d(0.999, 0, 0, 0, 0, 0.999, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
  100% { transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); }
`

const Animation = styled.div`
  width: 100%;
  animation: ${pop} 2s ease-in-out 1s;
`

export default BalloonSvg

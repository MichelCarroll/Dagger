

import React, { Component} from 'react'
import { Surface, Layer, Text } from 'react-canvas'
import ReactDOM from 'react-dom'



class MainComponent extends Component  {

  getTextStyle() {
    return {

      top: 10,
      left: 0,
      width: window.innerWidth,
      height: 20,
      lineHeight: 20
    }
  }

  render() {
    return <Surface width={window.innerWidth} height={window.innerHeight} top={0} left={0}>
      <Text style={this.getTextStyle()}>
        LOL
      </Text>
    </Surface>
  }
}

window.onload = () => {
    ReactDOM.render(<MainComponent />, document.getElementById('main'))
}

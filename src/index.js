

import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Tile } from './components'


class MainComponent extends Component  {
  getStyles() {
    return {
      width: '100%',
      height: '100%'
    }
  }
  render() {
    return <div style={this.getStyles()}>
      <Tile content="@" x={5} y={5} />
      <Tile content="@" x={5} y={6} />
      <Tile content="@" x={5} y={7} />
      <Tile content="@" x={6} y={5} />
      <Tile content="@" x={7} y={5} />
      <Tile content="@" x={6} y={6} />
    </div>
  }
}

window.onload = () => {
    ReactDOM.render(<MainComponent />, document.getElementById('main'))
}

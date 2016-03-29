

import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Tile } from './components'

function guy() {
  return { color: "red", background: "blue", content: "@" }
}

const map = [
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()]
]

class MainComponent extends Component  {
  getStyles() {
    return {
      width: '100%',
      height: '100%'
    }
  }
  getTiles() {
    return map.reduce((tiles, row, y) => {
      return Array.prototype.concat.apply(tiles, row.map((tile, x) => {
        return React.createElement(Tile, { ...tile, x, y })
      }))
    }, [])
  }
  render() {
    return <div style={this.getStyles()}>
      {this.getTiles()}
    </div>
  }
}

window.onload = () => {
    ReactDOM.render(<MainComponent />, document.getElementById('main'))
}

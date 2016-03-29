

import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './store'
import { Tile } from './components'


@connect((state) => { return {
  map: state.map
}})
class Map extends Component  {
  getStyles() {
    return {
      width: '100%',
      height: '100%'
    }
  }
  getTiles() {
    return this.props.map.reduce((tiles, row, y) => {
      return Array.prototype.concat.apply(tiles, row.map((tile, x) => {
        return React.createElement(
          Tile,
          { ...tile, x, y, key: `${x}.${y}`
        })
      }))
    }, [])
  }
  render() {
    return <div style={this.getStyles()}>
      {this.getTiles()}
    </div>
  }
}

class App extends Component {
  render() {
    return <Provider store={store}>
      <Map />
    </Provider>
  }
}

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('main'))
}

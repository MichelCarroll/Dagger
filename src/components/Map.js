
import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from '../store'
import { Tile } from '../components'


const mapWidth = 50
const mapHeight= 20
const emptyTile = { color: "", background: "black", content: "" }
const guyTile = { color: "yellow", background: "black", content: "@" }


@connect((state) => { return {
  character: state.character
}})
export default class Map extends Component  {
  getStyles() {
    return {
      width: '100%',
      height: '100%'
    }
  }
  characterInTile(x, y) {
    return x == this.props.character.x && y == this.props.character.y
  }
  getTile(x, y, definition) {
    return React.createElement(
      Tile,
      { ...definition, x, y, key: `${x}.${y}`}
    )
  }
  getTiles() {
    return _.range(mapHeight).map((y) => {
      return _.range(mapWidth).map((x) => {
        return this.characterInTile(x, y) ? this.getTile(x, y, guyTile) : this.getTile(x, y, emptyTile)
      })
    })
  }
  render() {
    return <div style={this.getStyles()}>
      {this.getTiles()}
    </div>
  }
}

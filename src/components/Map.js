
import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from '../state/store'
import { Tile } from '../components'


const guyTile = { color: "yellow", background: "black", content: "@" }


@connect((state) => { return {
  character: state.character,
  map: state.map
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
    let tile = definition
    if(this.characterInTile(x, y)) {
      tile = { ...tile, content: "@", color: "red"}
    }
    return React.createElement(
      Tile,
      { ...tile, x, y, key: `${x}.${y}`}
    )
  }
  getTiles() {
    return this.props.map.reduce((tiles, row, y) => {
      return tiles.concat(row.map((cell, x) => {
        return this.getTile(x, y, cell)
      }))
    }, [])
  }
  render() {
    return <div style={this.getStyles()}>
      {this.getTiles()}
    </div>
  }
}

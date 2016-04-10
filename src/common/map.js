
import _ from 'lodash'
import { TYPE_ROCK, TYPE_EMPTY } from 'common/types'
import { Point } from 'common/geometry'

export default class Map {

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.data = _.range(height).map((y) => {
      return _.range(width).map((x) => {
        return TYPE_ROCK
      })
    })
  }

  applyToCells(func) {
    this.data = this.mapCells(func)
  }

  mapCells(func) {
    return this.data.map((row, y) => {
      return row.map((cell, x) => {
        return func(cell, new Point({x, y}))
      })
    })
  }

  doesTileExist(point) {
    return this.data[point.y] && this.data[point.y][point.x]
  }

  getCellType(point) {
    if(!this.doesTileExist(point)) {
      throw RangeError("Tile does not exist")
    }
    return this.data[point.y][point.x]
  }

  setCellType(point, type) {
    if(!this.doesTileExist(point)) {
      throw RangeError("Tile does not exist")
    }
    this.data[point.y][point.x] = type
  }

  toDefinitions() {
    return this.mapCells((type, point) => {
      switch(type) {
        case TYPE_ROCK:  return { color: "", background: "black", content: "",  type: TYPE_ROCK }
        case TYPE_EMPTY: return { color: "", background: "yellow", content: "", type: TYPE_EMPTY }
      }
    })
  }

}


import _ from 'lodash'

const TYPE_ROCK = 'rock'
const TYPE_EMPTY = 'empty'

const mapWidth = 50
const mapHeight = 20

class Map {

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
    return this.data.map((row, y) => {
      return row.map((cell, x) => {
        return func(cell, x, y)
      })
    })
  }

  toDefinitions() {
    return this.applyToCells((type, x, y) => {
      switch(type) {
        case TYPE_ROCK:  return { color: "", background: "black", content: "" }
        case TYPE_EMPTY: return { color: "", background: "yellow", content: "" }
      }
    })
  }

}



class DungeonMap extends Map {

  constructor(width, height) {
    super(width, height)

    this.drawFirstRoom()
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  drawFirstRoom() {
    const midX = Math.floor(this.width / 2)
    const midY = Math.floor(this.height / 2)
    this.drawCircleRoom(midX, midY, 4)
  }

  drawCircleRoom(x, y, size) {
    this.data = this.applyToCells((type, x2, y2) => {
      if(this.distance(x, y, x2, y2) <= size) {
        return TYPE_EMPTY
      }
      return TYPE_ROCK
    })
  }

}

export function dungeonMap() {
  return (new DungeonMap(mapWidth, mapHeight)).toDefinitions()
}

export function emptyMap() {
  return (new Map(mapWidth, mapHeight)).toDefinitions()
}

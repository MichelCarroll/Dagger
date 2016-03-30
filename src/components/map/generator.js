
import _ from 'lodash'
import { TYPE_ROCK, TYPE_EMPTY } from './types'

const mapWidth = 80
const mapHeight = 30

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

  getCellType(x, y) {
    return this.data[y][x]
  }

  toDefinitions() {
    return this.applyToCells((type, x, y) => {
      switch(type) {
        case TYPE_ROCK:  return { color: "", background: "black", content: "",  type: TYPE_ROCK }
        case TYPE_EMPTY: return { color: "", background: "yellow", content: "", type: TYPE_EMPTY }
      }
    })
  }

}

class DungeonMap extends Map {

  static RETRY_FOR_GET_EDGE = 100;

  constructor(width, height) {
    super(width, height)
    this.cleared = []
    this.drawFirstRoom()
    this.cutIntoEdges(10)
  }

  distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
  }

  drawFirstRoom() {
    const midX = Math.floor(this.width / 2)
    const midY = Math.floor(this.height / 2)
    this.drawCircleRoom(midX, midY, 4)
  }

  drawCircleRoom(midX, midY, size) {
    this.data = this.applyToCells((type, x, y) => {
      if(this.distance(midX, midY, x, y) <= size) {
        this.cleared.push({x, y})
        return TYPE_EMPTY
      }
      return TYPE_ROCK
    })
  }

  cutIntoEdges(i) {
    for(let w = 0; w < i; w++) {
      let {x, y} = this.getRandomEdge()
      this.data[y][x] = TYPE_EMPTY
    }
  }

  getRandomEdge() {
    let i = 0
    while(i < DungeonMap.RETRY_FOR_GET_EDGE) {
      let {x, y} = this.getRandomCellNextToCleared()
      if(this.getCellType(x, y) === TYPE_ROCK) {
        return {x, y}
      }
    }
  }

  getRandomCellNextToCleared() {
    const {x, y} = this.getRandomClearedCell();
    return this.getRandomAjacentCell(x, y);
  }

  getRandomAjacentCell(x, y) {
    switch(_.random(3)) {
      case 0: return { x, y: y+1}
      case 1: return { x, y: y-1}
      case 2: return { x: x+1, y}
    }
    return { x: x-1, y}
  }

  getRandomClearedCell() {
    return this.cleared[_.random(this.cleared.length - 1)]
  }

}

export function dungeonMap() {
  return (new DungeonMap(mapWidth, mapHeight)).toDefinitions()
}

export function emptyMap() {
  return (new Map(mapWidth, mapHeight)).toDefinitions()
}

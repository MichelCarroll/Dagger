
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
    if(!this.data[y]) {
      return;
    }
    return this.data[y][x]
  }

  setCellType(x, y, type) {
    this.data[y][x] = type
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


const UP = 'up'
const DOWN = 'down'
const RIGHT = 'right'
const LEFT = 'left'


class DungeonMap extends Map {

  static RETRY_FOR_GET_EDGE = 100;
  static RETRY_FOR_DRAW_FEATURE = 100;

  constructor(width, height) {
    super(width, height)
    this.cleared = []
    this.drawFirstRoom()
    this.cutIntoEdges(10)
    this.drawHallway(10)
  }

  drawHallway(length) {
    let i = 0
    while(i++ < DungeonMap.RETRY_FOR_DRAW_FEATURE) {
      this.attemptDrawHallway(length)
      break;
    }
  }

  attemptDrawHallway(length) {
    const {dir, x, y} = this.getRandomEdge()
    let { x1, y1, x2, y2 } = this.vectorToRect(dir, x, y, 1, length)
    if(this.isAreaRock(x1, y1, x2, y2)) {
      let { x1, y1, x2, y2 } = this.vectorToRect(dir, x, y, 0, length)
      this.drawArea( x1, y1, x2, y2 )
    }
  }

  dig(x, y) {
    this.setCellType(x, y, TYPE_EMPTY)
    this.cleared.push({x, y})
  }

  drawArea(x1, y1, x2, y2) {
    _.range(x1, x2+1).forEach((x) => {
      _.range(y1, y2+1).forEach((y) => {
        this.dig(x, y)
      })
    })
  }

  vectorToRect(dir, x, y, thickness, depth) {
    let x1 = x, x2 = x
    let y1 = y, y2 = y
    switch(dir) {
      case UP:
        x1 = Math.max(x1 - thickness, 0);
        x2 = Math.min(x2 + thickness, this.width-1);
        y1 = Math.max(y1 - depth, 0);
        break;
      case DOWN:
        x1 = Math.max(x1 - thickness, 0)
        x2 = Math.min(x2 + thickness, this.width-1);
        y2 = Math.min(y2 + depth, this.height-1);
        break;
      case RIGHT:
        y1 = Math.max(y1 - thickness, 0)
        y2 = Math.min(y2 + thickness, this.height-1);
        x2 = Math.min(x2 + depth, this.width-1);
        break;
      case LEFT:
        y1 = Math.max(y1 - thickness, 0);
        y2 = Math.min(y2 + thickness, this.height-1);
        x1 = Math.max(x1 - depth, 0)
        break;
    }
    return {x1, y1, x2, y2}
  }

  isAreaRock(x1, y1, x2, y2) {
    _.range(x1, x2+1).forEach((x) => {
      _.range(y1, y2+1).forEach((y) => {
        if(this.isCellRock(x, y)) {
          return false
        }
      })
    })
    return true
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

  isCellRock(x, y) {
    return this.getCellType(x, y) == TYPE_ROCK
  }

  cutIntoEdges(i) {
    for(let w = 0; w < i; w++) {
      let {x, y} = this.getRandomEdge()
      this.dig(x, y)
    }
  }

  getRandomEdge() {
    let i = 0
    while(i++ < DungeonMap.RETRY_FOR_GET_EDGE) {
      let {dir, x, y} = this.getRandomCellNextToCleared()
      let type = this.getCellType(x, y)
      if(type && type === TYPE_ROCK) {
        return {dir, x, y}
      }
    }
  }

  getRandomCellNextToCleared() {
    const {x, y} = this.getRandomClearedCell();
    return this.getRandomAjacentCell(x, y);
  }

  getRandomAjacentCell(x, y) {
    switch(_.random(3)) {
      case 0: return { dir: DOWN, x, y: y+1}
      case 1: return { dir: UP, x, y: y-1}
      case 2: return { dir: RIGHT, x: x+1, y}
    }
    return { dir: LEFT, x: x-1, y}
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

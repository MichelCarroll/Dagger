
import _ from 'lodash'
import { TYPE_ROCK, TYPE_EMPTY } from './types'


export class Point {
  constructor(coord) {
    this.x = coord.x
    this.y = coord.y
  }
}

export class Rect {
  constructor(edge1, edge2) {
    this.edge1 = edge1
    this.edge2 = edge2
  }
}

export class Map {

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
    return this.applyToCells((type, point) => {
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


export class DungeonMap extends Map {

  static RETRY_FOR_GET_EDGE = 100;
  static RETRY_FOR_DRAW_FEATURE = 100;

  constructor(width, height) {
    super(width, height)
    this.cleared = []
  }

  turnIntoDungeon() {
    this.drawFirstRoom()
    this.cutIntoEdges(10)
    this.drawHallway(10)
    return this
  }

  drawHallway(length) {
    let i = 0
    while(i++ < DungeonMap.RETRY_FOR_DRAW_FEATURE) {
      this.attemptDrawHallway(length)
      break;
    }
  }

  attemptDrawHallway(length) {
    const {dir, point} = this.getRandomEdge()
    let rect = this.vectorToRect(dir, point, 1, length)
    if(this.isAreaRock(rect)) {
      let rect = this.vectorToRect(dir, point, 0, length)
      this.digArea(rect)
    }
  }

  dig(point) {
    this.setCellType(point, TYPE_EMPTY)
    this.cleared.push(point)
  }

  digArea(rect) {
    _.range(rect.edge1.x, rect.edge2.x+1).forEach((x) => {
      _.range(rect.edge1.y, rect.edge2.y+1).forEach((y) => {
        this.dig(new Point({x, y}))
      })
    })
  }

  vectorToRect(dir, point, thickness, depth) {
    let x1 = point.x, x2 = point.x
    let y1 = point.y, y2 = point.y
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
    return new Rect(new Point({x:x1, y:y1}), new Point({x:x2, y:y2}))
  }

  isAreaRock(rect) {
    _.range(rect.edge1.x, rect.edge2.x+1).forEach((x) => {
      _.range(rect.edge1.y, rect.edge2.y+1).forEach((y) => {
        if(!this.doesTileExist(new Point({x, y}))) {
          return false
        }
        if(this.isCellRock(new Point({x, y}))) {
          return false
        }
      })
    })
    return true
  }

  distance(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
  }

  drawFirstRoom() {
    const midX = Math.floor(this.width / 2)
    const midY = Math.floor(this.height / 2)
    this.drawCircleRoom(midX, midY, 4)
  }

  drawCircleRoom(midX, midY, size) {
    const midPoint = new Point({x: midX, y: midY})
    this.data = this.applyToCells((type, point) => {
      if(this.distance(midPoint, point) <= size) {
        this.cleared.push(point)
        return TYPE_EMPTY
      }
      return TYPE_ROCK
    })
  }

  isCellRock(point) {
    return this.getCellType(point) == TYPE_ROCK
  }

  cutIntoEdges(i) {
    for(let w = 0; w < i; w++) {
      let { point } = this.getRandomEdge()
      this.dig(point)
    }
  }

  getRandomEdge() {
    let i = 0
    while(i++ < DungeonMap.RETRY_FOR_GET_EDGE) {
      let {dir, point} = this.getRandomCellNextToCleared()
      if(!this.doesTileExist(point)) {
        continue;
      }
      if(this.getCellType(point) === TYPE_ROCK) {
        return {dir, point}
      }
    }
  }

  getRandomCellNextToCleared() {
    return this.getRandomAjacentCell(
      this.getRandomClearedCell()
    );
  }

  getRandomAjacentCell(point) {
    switch(_.random(3)) {
      case 0: return { dir: DOWN,  point: new Point({x: point.x,   y: point.y+1})}
      case 1: return { dir: UP,    point: new Point({x: point.x,   y: point.y-1})}
      case 2: return { dir: RIGHT, point: new Point({x: point.x+1, y: point.y})}
    }
    return { dir: LEFT, point: new Point({x: point.x-1, y: point.y})}
  }

  getRandomClearedCell() {
    return this.cleared[_.random(this.cleared.length - 1)]
  }

}

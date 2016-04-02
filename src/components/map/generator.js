
import _ from 'lodash'
import { TYPE_ROCK, TYPE_EMPTY } from './types'
import { Rect, Point, Vector } from 'common/geometry'


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
    this.drawHallway(100)
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
    const vector = this.getRandomEdge()
    if(this.isAreaRock(Rect.fromVector(vector, 1, length))) {
      this.digArea(Rect.fromVector(vector, 0, length))
    }
  }

  dig(point) {
    if(!this.doesTileExist(point)) {
      return;
    }
    this.setCellType(point, TYPE_EMPTY)
    this.cleared.push(point)
  }

  digArea(rect) {
    rect.apply((point) => {
      this.dig(point)
    })
  }

  isAreaRock(rect) {
    rect.apply((point) => {
      return !this.doesTileExist(point) || this.isCellRock(point)
    })
    return true
  }

  drawFirstRoom() {
    const midX = Math.floor(this.width / 2)
    const midY = Math.floor(this.height / 2)
    this.drawCircleRoom(midX, midY, 4)
  }

  drawCircleRoom(midX, midY, size) {
    const midPoint = new Point({x: midX, y: midY})
    this.data = this.applyToCells((type, point) => {
      if(midPoint.distanceFrom(point) <= size) {
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
      this.dig(this.getRandomEdge().point)
    }
  }

  getRandomEdge() {
    let i = 0
    while(i++ < DungeonMap.RETRY_FOR_GET_EDGE) {
      let vector = this.getRandomVectorNextToCleared()
      if(!this.doesTileExist(vector.point)) {
        continue;
      }
      if(this.getCellType(vector.point) === TYPE_ROCK) {
        return vector
      }
    }
  }

  getRandomVectorNextToCleared() {
    return this.getRandomAjacentVector(
      this.getRandomClearedCell()
    );
  }

  getRandomDirection() {
    switch(_.random(3)) {
      case 0: return Vector.UP
      case 1: return Vector.DOWN
      case 2: return Vector.RIGHT
      case 3: return Vector.LEFT
    }
  }

  getRandomAjacentVector(point) {
    const dir = this.getRandomDirection()
    return new Vector({ dir, point: point.adjacent(dir)})
  }

  getRandomClearedCell() {
    return this.cleared[_.random(this.cleared.length - 1)]
  }

}

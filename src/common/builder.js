
import _ from 'lodash'
import { TYPE_ROCK, TYPE_EMPTY } from 'common/types'
import { Rect, Point, Vector } from 'common/geometry'

export class DungeonBuilder {

  static RETRY_FOR_GET_EDGE = 100;
  static RETRY_FOR_DRAW_FEATURE = 100;

  constructor(map) {
    this.map = map
    this.cleared = []
  }

  getMap() {
    return this.map
  }

  turnIntoDungeon() {
    this.drawFirstRoom()
    this.cutIntoEdges(10)
    this.drawHallway(10)
    return this
  }

  drawHallway(length) {
    let i = 0
    while(i++ < DungeonBuilder.RETRY_FOR_DRAW_FEATURE) {
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
    if(!this.map.doesTileExist(point)) {
      return;
    }
    this.map.setCellType(point, TYPE_EMPTY)
    this.cleared.push(point)
  }

  digArea(rect) {
    rect.apply((point) => {
      this.dig(point)
    })
  }

  isAreaRock(rect) {
    rect.apply((point) => {
      return !this.map.doesTileExist(point) || this.isCellRock(point)
    })
    return true
  }

  drawFirstRoom() {
    const midX = Math.floor(this.map.width / 2)
    const midY = Math.floor(this.map.height / 2)
    this.drawCircleRoom(midX, midY, 4)
  }

  drawCircleRoom(midX, midY, size) {
    const midPoint = new Point({x: midX, y: midY})
    this.map.applyToCells((type, point) => {
      if(midPoint.distanceFrom(point) <= size) {
        this.cleared.push(point)
        return TYPE_EMPTY
      }
      return TYPE_ROCK
    })
  }

  isCellRock(point) {
    return this.map.getCellType(point) == TYPE_ROCK
  }

  cutIntoEdges(i) {
    for(let w = 0; w < i; w++) {
      this.dig(this.getRandomEdge().point)
    }
  }

  getRandomEdge() {
    let i = 0
    while(i++ < DungeonBuilder.RETRY_FOR_GET_EDGE) {
      let vector = this.getRandomVectorNextToCleared()
      if(!this.map.doesTileExist(vector.point)) {
        continue;
      }
      if(this.map.getCellType(vector.point) === TYPE_ROCK) {
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

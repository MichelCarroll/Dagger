
import _ from 'lodash'
import { TYPE_ROCK, TYPE_EMPTY } from 'common/types'
import { Rect, Point, Vector, Circle } from 'common/geometry'

export class Digger {
  constructor(map) {
    this.map = map
    this.cleared = []
    this.edges = []
  }

  dig(point) {
    if(!this.map.doesTileExist(point)) {
      return;
    }
    this.map.setCellType(point, TYPE_EMPTY)
    this.cleared.push(point)
  }

  isEdge(point) {

  }

  getPastClearedCells() {
    return this.cleared
  }
}


export class DungeonBuilder {

  static RETRY_FOR_GET_EDGE = 100;
  static RETRY_FOR_DRAW_FEATURE = 100;

  constructor(map) {
    this.map = map
    this.digger = new Digger(map)
  }

  turnIntoDungeon() {
    this.drawFirstRoom()
    this.cutIntoEdges(10)
    this.drawHallway(10)
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

  digArea(shape) {
    shape.apply((point) => {
      this.digger.dig(point)
    })
  }

  isAreaRock(shape) {
    shape.apply((point) => {
      return !this.map.doesTileExist(point) || this.isCellRock(point)
    })
    return true
  }

  drawFirstRoom() {
    this.digArea(new Circle(new Point({
      x: Math.floor(this.map.width / 2),
      y: Math.floor(this.map.height / 2)
    }), 4))
  }

  isCellRock(point) {
    return this.map.getCellType(point) == TYPE_ROCK
  }

  cutIntoEdges(times) {
    for(let w = 0; w < times; w++) {
      this.digger.dig(this.getRandomEdge().point)
    }
  }

  getRandomEdge() {
    let i = 0
    while(i++ < DungeonBuilder.RETRY_FOR_GET_EDGE) {
      let edge = this.attemptGetRandomEdge()
      if(edge) {
        return edge
      }
    }
  }

  attemptGetRandomEdge() {
    let vector = this.getRandomVectorNextToCleared()
    if(!this.map.doesTileExist(vector.point)) {
      return;
    }
    if(this.map.getCellType(vector.point) !== TYPE_ROCK) {
      return;
    }
    return vector
  }

  getRandomVectorNextToCleared() {
    return this.getRandomAjacentVector(
      this.getRandomClearedCell()
    );
  }

  getRandomAjacentVector(point) {
    const dir = _.sample([Vector.UP, Vector.DOWN, Vector.RIGHT, Vector.LEFT])
    return new Vector({ dir, point: point.adjacent(dir) })
  }

  getRandomClearedCell() {
    const cells = this.digger.getPastClearedCells()
    return cells[_.random(cells.length - 1)]
  }

}

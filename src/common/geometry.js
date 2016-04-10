
import _ from 'lodash'


export class Point {
  constructor(coord) {
    this.x = coord.x
    this.y = coord.y
  }

  adjacent(dir) {
    switch(dir) {
      case Vector.UP:    return new Point({x: this.x, y: this.y+1})
      case Vector.DOWN:  return new Point({x: this.x, y: this.y-1})
      case Vector.RIGHT: return new Point({x: this.x+1, y: this.y})
      case Vector.LEFT:  return new Point({x: this.x-1, y: this.y})
    }
  }

  distanceFrom(point) {
    return Math.sqrt(Math.pow(this.x - point.x, 2) + Math.pow(this.y - point.y, 2))
  }

  adjacentTo(point) {
    return Vector.directions().reduce((prev, dir) => {
      return prev || (this.adjacent(dir)).equalTo(point)
    }, false)
  }

  equalTo(point) {
    return point.x === this.x && point.y === this.y
  }

  edges() {
    return Vector.directions().map((dir) => this.adjacent(dir))
  }
}

export class Vector {

  static UP = 'up'
  static DOWN = 'down'
  static RIGHT = 'right'
  static LEFT = 'left'

  constructor(options) {
    this.point = options.point
    this.dir = options.dir
  }

  static directions() {
    return [Vector.UP, Vector.DOWN, Vector.RIGHT, Vector.LEFT]
  }
}

export class Rect {
  constructor(edge1, edge2) {
    this.edge1 = edge1
    this.edge2 = edge2
  }

  static fromVector(vector, thickness, depth) {
    const point = vector.point
    let x1 = point.x, x2 = point.x
    let y1 = point.y, y2 = point.y
    switch(vector.dir) {
      case Vector.UP:
        x1 = x1 - thickness
        x2 = x2 + thickness
        y1 = y1 + depth
        break;
      case Vector.DOWN:
        x1 = x1 - thickness
        x2 = x2 + thickness
        y2 = y2 - depth
        break;
      case Vector.RIGHT:
        y1 = y1 - thickness
        y2 = y2 + thickness
        x2 = x2 + depth
        break;
      case Vector.LEFT:
        y1 = y1 - thickness
        y2 = y2 + thickness
        x1 = x1 - depth
        break;
    }
    return new Rect(new Point({x:x1, y:y1}), new Point({x:x2, y:y2}))
  }

  apply(func) {
    const lowerX = Math.min(this.edge1.x, this.edge2.x)
    const lowerY = Math.min(this.edge1.y, this.edge2.y)
    const higherX = Math.max(this.edge1.x, this.edge2.x)
    const higherY = Math.max(this.edge1.y, this.edge2.y)

    _.range(lowerX, higherX + 1).forEach((x) => {
      _.range(lowerY, higherY + 1).forEach((y) => {
        func(new Point({x, y}))
      })
    })
  }
}


export class Circle {
  constructor(middlePoint, radius) {
    this.middlePoint = middlePoint
    this.radius = radius
  }

  apply(func) {
    const lowerX = this.middlePoint.x - this.radius
    const lowerY = this.middlePoint.y - this.radius
    const higherX = this.middlePoint.x + this.radius
    const higherY = this.middlePoint.y + this.radius

    _.range(lowerX, higherX + 1).forEach((x) => {
      _.range(lowerY, higherY + 1).forEach((y) => {
        let point = new Point({x, y})
        if(this.middlePoint.distanceFrom(point) <= this.radius) {
          func(point)
        }
      })
    })
  }
}

"use strict";

import { Rect, Point, Vector } from 'common/geometry'

import assert from 'assert'
import { expect } from 'chai'
import _ from 'lodash'


describe('a Point', () => {
  var point = new Point({x: 5, y: 10})

  it('should have the right components', () => {
    expect(point.x).to.be.equal(5)
    expect(point.y).to.be.equal(10)
  })

  describe('adjacent', () => {
    it('to the right', () => {
      let adj = point.adjacent(Vector.RIGHT)
      expect(adj.x).to.be.equal(6)
      expect(adj.y).to.be.equal(10)
    })
    it('to the left', () => {
      let adj = point.adjacent(Vector.LEFT)
      expect(adj.x).to.be.equal(4)
      expect(adj.y).to.be.equal(10)
    })
    it('to the bottom', () => {
      let adj = point.adjacent(Vector.DOWN)
      expect(adj.x).to.be.equal(5)
      expect(adj.y).to.be.equal(9)
    })
    it('to the top', () => {
      let adj = point.adjacent(Vector.UP)
      expect(adj.x).to.be.equal(5)
      expect(adj.y).to.be.equal(11)
    })
  })

  it('should be the right distance from another', () => {
    let distance = point.distanceFrom(new Point({x: 5, y: 5}))
    expect(distance).to.be.equal(5)
  })

  it('should be the right distance from itself', () => {
    let distance = point.distanceFrom(point)
    expect(distance).to.be.equal(0)
  })

})


const checkCorrectPointComposition = (rect, coords) => {
  let points = []
  rect.apply((point) => {
    points.push(point)
  })

  expect(points).to.have.lengthOf(coords.length)
  coords.forEach((coord) => {
    expect(points.filter((p) => p.x == coord[0] && p.y == coord[1])).to.be.lengthOf(1)
  })
}

describe('a square Rect', () => {

  const expectedCoords = [[2,4],[2,5],[3,4],[3,5]]

  it('should be composed of the right points', () => {
    let rect = new Rect(new Point({x: 2, y: 4}), new Point({x: 3, y: 5}))
    checkCorrectPointComposition(rect, expectedCoords)
  })

  describe('built from edges out of order', () => {
    it('should be composed of the right points', () => {
      let rect = new Rect(new Point({x: 2, y: 5}), new Point({x: 3, y: 4}))
      checkCorrectPointComposition(rect, expectedCoords)
    })
  })
})


describe('a Rect built from a vector', () => {

  describe('from the right', () => {
    it('should be composed of the right points', () => {
      let vector = new Vector({dir: Vector.RIGHT, point: new Point({x: 5, y: 5})})
      let rect = Rect.fromVector(vector, 1, 1)
      checkCorrectPointComposition(rect, [[5,4],[5,5],[5,6],[6,4],[6,5],[6,6]])
    })
  })

  describe('from the top', () => {
    it('should be composed of the right points', () => {
      let vector = new Vector({dir: Vector.UP, point: new Point({x: 5, y: 5})})
      let rect = Rect.fromVector(vector, 1, 1)
      checkCorrectPointComposition(rect, [[4,5],[5,5],[6,5],[4,6],[5,6],[6,6]])
    })
  })

  describe('from the bottom', () => {
    it('should be composed of the right points', () => {
      let vector = new Vector({dir: Vector.DOWN, point: new Point({x: 5, y: 5})})
      let rect = Rect.fromVector(vector, 1, 1)
      checkCorrectPointComposition(rect, [[4,5],[5,5],[6,5],[4,4],[5,4],[6,4]])
    })
  })

  describe('from the left', () => {
    it('should be composed of the right points', () => {
      let vector = new Vector({dir: Vector.LEFT, point: new Point({x: 5, y: 5})})
      let rect = Rect.fromVector(vector, 1, 1)
      checkCorrectPointComposition(rect, [[5,4],[5,5],[5,6],[4,4],[4,5],[4,6]])
    })
  })

})

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

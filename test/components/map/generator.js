"use strict";

import { Point, Rect, Map, DungeonMap } from 'components/map/generator'
import { TYPE_ROCK, TYPE_EMPTY } from 'components/map/types'
import assert from 'assert'
import { expect } from 'chai'
import _ from 'lodash'


describe('Map', () => {
  var map = null

  beforeEach(() => {
    map = new Map(5, 10)
  })

  it('should have the right width and height', () => {
    expect(map.width).to.be.equal(5)
    expect(map.height).to.be.equal(10)
  })

  it('should have all rock tiles', () => {
    _.range(0, map.width).forEach((x) => {
      _.range(0, map.height).forEach((y) => {
        expect(map.getCellType(new Point({x, y}))).to.be.equal(TYPE_ROCK)
      })
    })
  })

  describe('setting to an empty tile', () => {
    describe('an unexisting tile', () => {
      it('should throw an error', () => {
        assert.throws(map.setCellType.bind(map, new Point({x:5, y:10}), TYPE_EMPTY), RangeError, "Tile does not exist")
      })
    })
    describe('an existing upper left edge tile', () => {
      it('should turn it empty', () => {
        map.setCellType(new Point({x:0, y:0}), TYPE_EMPTY)
        expect(map.getCellType(new Point({x:0, y:0}))).to.be.equal(TYPE_EMPTY)
      })
    })
    describe('an existing middle tile', () => {
      it('should turn it empty', () => {
        map.setCellType(new Point({x:2, y:3}), TYPE_EMPTY)
        expect(map.getCellType(new Point({x:2, y:3}))).to.be.equal(TYPE_EMPTY)
      })
    })
    describe('an existing lower right edge tile', () => {
      it('should turn it empty', () => {
        map.setCellType(new Point({x:4, y:9}), TYPE_EMPTY)
        expect(map.getCellType(new Point({x:4, y:9}))).to.be.equal(TYPE_EMPTY)
      })
    })
  })

})


describe('Dungeon Map', () => {
  var map = null

  beforeEach(() => {
    map = new DungeonMap(5, 10)
  })

  describe('digging', () => {
    describe('an existing middle tile', () => {
      it('should turn it empty', () => {
        map.dig(new Point({x:2, y:3}))
        expect(map.getCellType(new Point({x:2, y:3}))).to.be.equal(TYPE_EMPTY)
      })
    })
  })

  describe('digging area', () => {
    it('should turn it empty', () => {
      map.digArea(new Rect(new Point({x:1, y:3}), new Point({x:3, y:5})))
      expect(map.getCellType(new Point({x:1, y:3}))).to.be.equal(TYPE_EMPTY)
      expect(map.getCellType(new Point({x:3, y:5}))).to.be.equal(TYPE_EMPTY)
      expect(map.getCellType(new Point({x:0, y:2}))).to.be.equal(TYPE_ROCK)
      expect(map.getCellType(new Point({x:4, y:6}))).to.be.equal(TYPE_ROCK)
    })
  })


})

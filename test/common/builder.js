"use strict";

import { DungeonBuilder } from 'common/builder'
import { Rect, Point, Vector } from 'common/geometry'
import { TYPE_ROCK, TYPE_EMPTY } from 'common/types'
import Map from 'common/map'

import assert from 'assert'
import { expect } from 'chai'
import _ from 'lodash'


describe('a Dungeon Builder', () => {
  var map = null
  var builder = null

  beforeEach(() => {
    map = new Map(5, 10)
    builder = new DungeonBuilder(map)
  })

  describe('digging', () => {
    describe('an existing middle tile', () => {
      it('should turn it empty', () => {
        builder.dig(new Point({x:2, y:3}))
        expect(map.getCellType(new Point({x:2, y:3}))).to.be.equal(TYPE_EMPTY)
      })
    })
    describe('an unexisting tile', () => {
      it('should not throw', () => {
        builder.dig(new Point({x:20, y:30}))
      })
    })
  })

  describe('digging area', () => {
    it('should turn it empty', () => {
      builder.digArea(new Rect(new Point({x:1, y:3}), new Point({x:3, y:5})))
      expect(map.getCellType(new Point({x:1, y:3}))).to.be.equal(TYPE_EMPTY)
      expect(map.getCellType(new Point({x:3, y:5}))).to.be.equal(TYPE_EMPTY)
      expect(map.getCellType(new Point({x:0, y:2}))).to.be.equal(TYPE_ROCK)
      expect(map.getCellType(new Point({x:4, y:6}))).to.be.equal(TYPE_ROCK)
    })
  })


})

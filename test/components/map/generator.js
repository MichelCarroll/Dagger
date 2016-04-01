"use strict";

import { DungeonMap } from 'components/map/generator'
import assert from 'assert'
import { expect } from 'chai'



describe('Dungeon Map', () => {
  const map = new DungeonMap(80, 30)

  it('should have the right width and height', () => {
    expect(map.width).to.be.equal(80)
    expect(map.height).to.be.equal(30)
  });
});

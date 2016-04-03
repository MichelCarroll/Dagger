
import { TYPE_ROCK, TYPE_EMPTY } from 'common/types'
import Map from 'common/map'
import { DungeonBuilder } from 'common/builder'

const mapWidth = 80
const mapHeight = 30

const map = new Map(mapWidth, mapHeight)
const builder = new DungeonBuilder(map)
builder.turnIntoDungeon()

const initialState = map.toDefinitions()

export function reducer(state = initialState, action) {
  return state
}

export function tileIsEmpty(state, x, y) {
  return state.map[y][x].type === TYPE_EMPTY
}

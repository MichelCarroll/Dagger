
import { TYPE_ROCK, TYPE_EMPTY } from './types'
import { DungeonMap } from './generator'

const mapWidth = 80
const mapHeight = 30

const initialState = (new DungeonMap(mapWidth, mapHeight))
  .turnIntoDungeon()
  .toDefinitions()

export function reducer(state = initialState, action) {
  return state
}

export function tileIsEmpty(state, x, y) {
  return state.map[y][x].type === TYPE_EMPTY
}

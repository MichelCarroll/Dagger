
import { TYPE_ROCK, TYPE_EMPTY } from './types'
import { dungeonMap } from './generator'

const initialState = dungeonMap()

export function reducer(state = initialState, action) {
  return state
}

export function tileIsEmpty(state, x, y) {
  return state.map[y][x].type === TYPE_EMPTY
}

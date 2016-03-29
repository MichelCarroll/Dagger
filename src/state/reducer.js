

import { emptyMap } from '../mapGenerator'
import _ from 'lodash'

const MOVE_UP = 'move_up'
const MOVE_RIGHT = 'move_right'
const MOVE_DOWN = 'move_down'
const MOVE_LEFT = 'move_left'

const initialState = {
  character: {
    x: 25,
    y: 10
  },
  map: emptyMap()
}

export default (state = initialState, action) => {
  switch(action.type) {
    case MOVE_UP:
      return {
        ...state,
        character: {
          ...state.character,
          y: state.character.y - 1
        }
      }
    case MOVE_DOWN:
      return {
        ...state,
        character: {
          ...state.character,
          y: state.character.y + 1
        }
      }
    case MOVE_LEFT:
      return {
        ...state,
        character: {
          ...state.character,
          x: state.character.x - 1
        }
      }
    case MOVE_RIGHT:
      return {
        ...state,
        character: {
          ...state.character,
          x: state.character.x + 1
        }
      }
  }
  return state
}

function toAction(type) {
  return { type, ts: +(new Date()) }
}

export function moveUp() {
  return toAction(MOVE_UP)
}

export function moveRight() {
  return toAction(MOVE_RIGHT)
}

export function moveDown() {
  return toAction(MOVE_DOWN)
}

export function moveLeft() {
  return toAction(MOVE_LEFT)
}

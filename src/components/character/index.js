

export const MOVE_UP = 'move_up'
export const MOVE_RIGHT = 'move_right'
export const MOVE_DOWN = 'move_down'
export const MOVE_LEFT = 'move_left'

const initialState = {
  x: 40,
  y: 15
}

export function reducer(state = initialState, action) {
  switch(action.type) {
    case MOVE_UP:
      return { ...state, y: state.y - 1 }
    case MOVE_DOWN:
      return { ...state, y: state.y + 1 }
    case MOVE_RIGHT:
      return { ...state, x: state.x + 1 }
    case MOVE_LEFT:
      return { ...state, x: state.x - 1 }
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

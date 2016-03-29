
import { createStore } from 'redux'


function guy() {
  return { color: "purple", background: "blue", content: "@" }
}

const map = [
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()],
  [guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy(), guy()]
]

const initialState = { map }

const store = createStore((state = initialState, action) => {
  return state
})

export default store


import { createStore, combineReducers, applyMiddleware } from 'redux'

import { reducer as map } from '../components/map'
import { reducer as character } from '../components/character'

export default createStore(combineReducers({
  map,
  character
}))

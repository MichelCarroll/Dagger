
import { createStore, combineReducers, applyMiddleware } from 'redux'

import { reducer as mapReducer } from '../components/map'
import { reducer as characterReducer, middleware as characterMiddleware } from '../components/character'

export default createStore(
  combineReducers({
    map: mapReducer,
    character: characterReducer
  }),
  applyMiddleware(
    characterMiddleware
  )
)

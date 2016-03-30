

import React, { PropTypes, Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider, connect } from 'react-redux'
import store from './state/store'
import { Map } from './views'
import { moveUp, moveDown, moveRight, moveLeft } from './components/character'

const KEY_LEFT = 37
const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_DOWN = 40

window.onkeydown = function(event) {
  const action = getActionFromKeydown(event.keyCode)
  action && store.dispatch(action)
}

function getActionFromKeydown(code) {
  switch(code) {
    case KEY_UP:    return moveUp();
    case KEY_DOWN:  return moveDown();
    case KEY_RIGHT: return moveRight();
    case KEY_LEFT:  return moveLeft();
  }
}

class App extends Component {
  render() {
    return <Provider store={store}>
      <Map />
    </Provider>
  }
}

window.onload = () => {
    ReactDOM.render(<App />, document.getElementById('main'))
}

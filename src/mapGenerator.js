
import _ from 'lodash'

const TYPE_ROCK = 'rock'
const TYPE_EMPTY = 'empty'

const mapWidth = 50
const mapHeight= 20

function initMap() {
  return _.range(mapHeight).map((y) => {
    return _.range(mapWidth).map((x) => {
      if((x + y) % 2 == 0) {
          return TYPE_EMPTY
      }
      return TYPE_ROCK
    })
  })
}

function applyToCells(map, func) {
  return map.map((row, y) => {
    return row.map((cell, x) => {
      return func(cell, x, y)
    })
  })
}

function typeToDefinition(map) {
  return applyToCells(map, (type, x, y) => {
    switch(type) {
      case TYPE_ROCK:  return { color: "", background: "black", content: "" }
      case TYPE_EMPTY: return { color: "", background: "yellow", content: "" }
    }
  })
}


export function emptyMap() {
  return typeToDefinition(initMap())
}

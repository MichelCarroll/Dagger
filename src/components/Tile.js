

import React, { PropTypes, Component} from 'react'

export default class Tile extends Component  {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired
  };

  getTileSize() {
    return 20
  }

  getTextStyle() {
    return {
      position: 'absolute',
      display: 'inline-block',
      left: this.props.x * this.getTileSize(),
      top: this.props.y * this.getTileSize(),
      width: this.getTileSize(),
      height: this.getTileSize(),
      lineHeight: this.getTileSize()+'px',
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 14,
      color: "red",
      background: "blue",
      textAlign: "center"
    }
  }

  render() {
    return <span style={this.getTextStyle()}>{this.props.content}</span>
  }
}

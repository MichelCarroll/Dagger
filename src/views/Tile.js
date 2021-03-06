

import React, { PropTypes, Component} from 'react'

export default class Tile extends Component  {

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    background: PropTypes.string.isRequired
  };

  getWidth() {
    return 10
  }

  getHeight() {
    return 18
  }

  getTextStyle() {
    return {
      position: 'absolute',
      display: 'inline-block',
      left: this.props.x * this.getWidth(),
      top: this.props.y * this.getHeight(),
      width: this.getWidth(),
      height: this.getHeight(),
      lineHeight: this.getHeight()+'px',
      fontFamily: '"Lucida Console", Monaco, monospace',
      fontSize: 14,
      color: this.props.color,
      background: this.props.background,
      textAlign: "center"
    }
  }

  render() {
    return <span style={this.getTextStyle()}>{this.props.content}</span>
  }
}

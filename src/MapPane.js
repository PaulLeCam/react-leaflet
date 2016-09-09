/* @flow */
import React, { PropTypes, Component } from 'react'

import childrenType from './types/children'
import mapType from './types/map'
import paneType from './types/pane'

export default class MapPane extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: childrenType,
    map: mapType,
  };

  static contextTypes = {
    map: mapType,
  };

  static childContextTypes = {
    pane: paneType,
  };

  getChildContext () {
    return {
      pane: this.leafletElement,
    }
  }

  componentWillMount () {
    const { name } = this.props
    const map = this.context.map || this.props.map

    if (name && map && map.createPane) {
      this.leafletElement = map.createPane(name)
    }

    console.log(name, this)
  }

  componentWillUnmount () {
    this.leafletElement && this.leafletElement.remove && this.leafletElement.remove()
  }

  getChildren () {
    return React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, this.props) : null
    })
  }

  render (): any {
    return <div style={{display: 'none'}}>{this.getChildren()}</div>
  }
}

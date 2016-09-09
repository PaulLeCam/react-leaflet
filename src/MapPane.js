/* @flow */
import React, { Component, PropTypes } from 'react'
import { createPane } from 'leaflet'

import childrenType from './types/children'

export default class MapPane extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: childrenType,
  }

  getChildContext () {
    return {
      pane: this.leafletElement,
    }
  }

  componentWillMount () {
    const { name } = this.props

    if (name) {
      this.leafletElement = createPane(name)
    }
  }

  componentWillUnmount () {
    this.leafletElement && this.leafletElement.remove()
  }

  render (): any {
    return <div style={{display: 'none'}}>{this.props.children}</div>
  }
}

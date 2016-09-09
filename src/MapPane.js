/* @flow */
import React, { Component, PropTypes } from 'react'
import { createPane } from 'leaflet'

import childrenType from './types/children'

function nameIsRequired () {
  throw Error('name is required')
}

export default class MapPane extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: childrenType,
  }

  componentWillMount () {
    const { name = nameIsRequired() } = this.props
    this.leafletElement = createPane(name)
  }

  componentWillUnmount () {
    this.leafletElement.remove()
  }

  render () {
    return React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, {...this.props, pane: this.leafletElement}) : null
    })
  }
}

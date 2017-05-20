// @flow

import React, { Component } from 'react'

import controlPositionType from './propTypes/controlPosition'
import mapType from './propTypes/map'

export default class MapControl extends Component {
  static propTypes = {
    position: controlPositionType,
  }

  static contextTypes = {
    map: mapType,
  }

  leafletElement: Object

  // eslint-disable-next-line no-unused-vars
  createLeafletElement(props: Object): Object {
    throw new Error('createLeafletElement() must be implemented')
  }

  updateLeafletElement(fromProps: Object, toProps: Object): void {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setPosition(toProps.position)
    }
  }

  componentWillMount() {
    this.leafletElement = this.createLeafletElement(this.props)
  }

  componentDidMount() {
    this.leafletElement.addTo(this.context.map)
  }

  componentDidUpdate(prevProps: Object) {
    this.updateLeafletElement(prevProps, this.props)
  }

  componentWillUnmount() {
    this.leafletElement.remove()
  }

  render(): null | React.Element<*> {
    return null
  }
}

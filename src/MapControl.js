/* @flow */

import { Component } from 'react'

import controlPositionType from './types/controlPosition'
import mapType from './types/map'

export default class MapControl extends Component {
  static propTypes = {
    position: controlPositionType,
  };

  static contextTypes = {
    map: mapType,
  };

  componentDidMount () {
    this.leafletElement.addTo(this.context.map)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setPosition(this.props.position)
    }
  }

  componentWillUnmount () {
    this.leafletElement.remove()
  }

  leafletElement: Object;

  render () {
    return null
  }
}

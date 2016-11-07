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

  leafletElement: Object

  componentDidMount () {
    this.leafletElement.addTo(this.context.map)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setPosition(this.props.position)
    }
  }

  componentWillUnmount () {
<<<<<<< HEAD
    this.leafletElement.removeFrom(this.context.map)
  }

  getLeafletElement (): Object {
    warning(false, 'The "getLeafletElement()" method is deprecated and will be removed in the next version, simply use the "leafletElement" property instead.')
    return this.leafletElement
=======
    this.leafletElement.remove()
>>>>>>> next
  }

  render (): null {
    return null
  }
}

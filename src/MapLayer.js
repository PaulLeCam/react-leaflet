/* @flow */

import React from 'react'

import childrenType from './types/children'
import layerContainerType from './types/layerContainer'
import mapType from './types/map'

import MapComponent from './MapComponent'

export default class MapLayer extends MapComponent {
  static propTypes = {
    children: childrenType,
  };

  static contextTypes = {
    layerContainer: layerContainerType,
    map: mapType,
  };

  get layerContainer (): Object {
    return this.context.layerContainer || this.context.map
  }

  componentDidMount () {
    super.componentDidMount()
    this.layerContainer.addLayer(this.leafletElement)
  }

  componentWillUnmount () {
    super.componentWillUnmount()
    this.layerContainer.removeLayer(this.leafletElement)
  }

  render (): any {
    return <div style={{display: 'none'}}>{this.props.children}</div>
  }
}

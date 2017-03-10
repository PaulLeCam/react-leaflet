// @flow

import { gridLayer } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import mapType from './types/map'
import MapLayer from './MapLayer'

export default class GridLayer extends MapLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  }

  static contextTypes = {
    map: mapType,
  }

  getOptions (props?: Object): Object {
    return {
      maxZoom: this.context.map.options.maxZoom,
      minZoom: this.context.map.options.minZoom,
      ...super.getOptions(props),
    }
  }

  createLeafletElement (props: Object): Object {
    return gridLayer(this.getOptions(props))
  }

  updateLeafletElement (fromProps: Object, toProps: Object) {
    const { opacity, zIndex } = toProps
    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  render (): null {
    return null
  }
}

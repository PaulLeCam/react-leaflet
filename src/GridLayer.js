// @flow

import { gridLayer } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import MapLayer from './MapLayer'

export default class GridLayer extends MapLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
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

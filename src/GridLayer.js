// @flow

import { gridLayer } from 'leaflet'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'

import MapLayer from './MapLayer'

export default class GridLayer extends MapLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  }

  getOptions(props?: Object): Object {
    const options = super.getOptions(props)
    const map = this.context.map
    return map
      ? {
          maxZoom: map.options.maxZoom,
          minZoom: map.options.minZoom,
          ...options,
        }
      : options
  }

  createLeafletElement(props: Object): Object {
    return gridLayer(this.getOptions(props))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    const { opacity, zIndex } = toProps
    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  render(): null {
    return null
  }
}

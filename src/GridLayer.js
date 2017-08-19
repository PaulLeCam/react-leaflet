// @flow

import { GridLayer as LeafletGridLayer } from 'leaflet'
import PropTypes from 'prop-types'

import MapLayer from './MapLayer'
import children from './propTypes/children'
import type { GridLayerProps } from './types'

export default class GridLayer<
  LeafletElement: LeafletGridLayer,
  Props: GridLayerProps,
> extends MapLayer<LeafletElement, Props> {
  static propTypes = {
    children: children,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  }

  getOptions(props: Props): Props {
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

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletGridLayer(this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    const { opacity, zIndex } = toProps
    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  render() {
    return null
  }
}

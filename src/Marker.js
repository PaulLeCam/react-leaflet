// @flow

import { Icon, Marker as LeafletMarker, type Layer } from 'leaflet'
import PropTypes from 'prop-types'

import MapLayer from './MapLayer'
import children from './propTypes/children'
import latlng from './propTypes/latlng'
import layer from './propTypes/layer'
import type { LatLng, MapLayerProps } from './types'

type LeafletElement = LeafletMarker
type Props = {
  icon?: Icon,
  draggable?: boolean,
  opacity?: number,
  position: LatLng,
  zIndexOffset?: number,
} & MapLayerProps

export default class Marker extends MapLayer<LeafletElement, Props> {
  static propTypes = {
    children: children,
    draggable: PropTypes.bool,
    icon: PropTypes.instanceOf(Icon),
    opacity: PropTypes.number,
    position: latlng.isRequired,
    zIndexOffset: PropTypes.number,
  }

  static childContextTypes = {
    popupContainer: layer,
  }

  getChildContext(): { popupContainer: Layer } {
    return {
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletMarker(props.position, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position)
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon)
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset)
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity)
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable === true) {
        this.leafletElement.dragging.enable()
      } else {
        this.leafletElement.dragging.disable()
      }
    }
  }
}

// @flow

import { Icon, marker } from 'leaflet'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'
import latlngType from './propTypes/latlng'
import MapLayer from './MapLayer'

export default class Marker extends MapLayer {
  static propTypes = {
    children: childrenType,
    icon: PropTypes.instanceOf(Icon),
    opacity: PropTypes.number,
    position: latlngType.isRequired,
    zIndexOffset: PropTypes.number,
  }

  static childContextTypes = {
    popupContainer: PropTypes.object,
  }

  getChildContext(): { popupContainer: Object } {
    return {
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement(props: Object): Object {
    const { position, ...options } = props
    return marker(position, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
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
      if (toProps.draggable) {
        this.leafletElement.dragging.enable()
      } else {
        this.leafletElement.dragging.disable()
      }
    }
  }
}

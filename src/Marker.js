// @flow

import { Icon, marker } from 'leaflet'
import React, { PropTypes } from 'react'

import childrenType from './types/children'
import latlngType from './types/latlng'
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

  getChildContext (): {popupContainer: Object} {
    return {
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement (props: Object): Object {
    const { position, ...options } = props
    return marker(position, this.getOptions(options))
  }

  updateLeafletElement (fromProps: Object, toProps: Object) {
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

  render (): null | React.Element<*> {
    return this.props.children || null
  }
}

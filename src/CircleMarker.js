// @flow

import { circleMarker } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import latlngType from './types/latlng'
import Path from './Path'

export default class CircleMarker extends Path {
  static propTypes = {
    center: latlngType.isRequired,
    children: childrenType,
    radius: PropTypes.number,
  }

  createLeafletElement (props: Object): Object {
    const { center, ...options } = props
    return circleMarker(center, this.getOptions(options))
  }

  updateLeafletElement (fromProps: Object, toProps: Object) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center)
    }
    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius)
    }
  }
}

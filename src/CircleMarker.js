// @flow

import { circleMarker } from 'leaflet'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'
import latlngType from './propTypes/latlng'

import Path from './Path'

export default class CircleMarker extends Path {
  static propTypes = {
    center: latlngType.isRequired,
    children: childrenType,
    radius: PropTypes.number,
  }

  createLeafletElement(props: Object): Object {
    const { center, ...options } = props
    return circleMarker(center, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center)
    }
    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius)
    }
  }
}

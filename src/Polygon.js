// @flow

import { polygon } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import latlngListType from './types/latlngList'
import Path from './Path'

const multiLatLngListType = PropTypes.arrayOf(latlngListType)

export default class Polygon extends Path {
  static propTypes = {
    children: childrenType,
    popupContainer: PropTypes.object,
    positions: PropTypes.oneOfType([
      latlngListType,
      multiLatLngListType,
      PropTypes.arrayOf(multiLatLngListType),
    ]).isRequired,
  }

  createLeafletElement (props: Object): Object {
    const { positions, ...options } = props
    return polygon(positions, this.getOptions(options))
  }

  updateLeafletElement (fromProps: Object, toProps: Object) {
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

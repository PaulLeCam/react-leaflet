// @flow

import { polygon } from 'leaflet'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'
import latlngListType from './propTypes/latlngList'

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

  createLeafletElement(props: Object): Object {
    const { positions, ...options } = props
    return polygon(positions, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    console.log(
      'positions',
      toProps.positions !== fromProps.positions,
      fromProps.positions,
      toProps.positions,
    )
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

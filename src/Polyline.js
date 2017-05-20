// @flow

import { polyline } from 'leaflet'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'
import latlngListType from './propTypes/latlngList'

import Path from './Path'

export default class Polyline extends Path {
  static propTypes = {
    children: childrenType,
    positions: PropTypes.oneOfType([
      latlngListType,
      PropTypes.arrayOf(latlngListType),
    ]).isRequired,
  }

  createLeafletElement(props: Object): Object {
    const { positions, ...options } = props
    return polyline(positions, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

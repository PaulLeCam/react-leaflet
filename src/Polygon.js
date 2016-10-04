/* @flow */

import { polygon } from 'leaflet'
import { PropTypes } from 'react'

import latlngListType from './types/latlngList'
import Path from './Path'

const multiLatLngListType = PropTypes.arrayOf(latlngListType)

export default class Polygon extends Path {
  static propTypes = {
    positions: PropTypes.oneOfType([
      latlngListType,
      multiLatLngListType,
      PropTypes.arrayOf(multiLatLngListType),
    ]).isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { positions, ...props } = this.props
    this.leafletElement = polygon(positions, this.getOptions(props))
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}

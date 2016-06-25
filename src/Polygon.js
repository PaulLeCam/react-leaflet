/* @flow */

import { polygon } from 'leaflet'
import { PropTypes } from 'react'

import latlngListType from './types/latlngList'
import Path from './Path'

export default class Polygon extends Path {
  static propTypes = {
    positions: PropTypes.oneOfType([
      latlngListType,
      PropTypes.arrayOf(latlngListType),
    ]).isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { positions, ...props } = this.props
    this.leafletElement = polygon(positions, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}

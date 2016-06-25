/* @flow */

import { multiPolygon } from 'leaflet'
import { PropTypes } from 'react'

import latlngListType from './types/latlngList'
import Path from './Path'

export default class MultiPolygon extends Path {
  static propTypes = {
    polygons: PropTypes.arrayOf(latlngListType).isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { polygons, ...props } = this.props
    this.leafletElement = multiPolygon(polygons, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.polygons !== prevProps.polygons) {
      this.leafletElement.setLatLngs(this.props.polygons)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}

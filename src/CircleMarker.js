/* @flow */

import { circleMarker } from 'leaflet'
import { PropTypes } from 'react'

import latlngType from './types/latlng'
import Path from './Path'

export default class CircleMarker extends Path {
  static propTypes = {
    center: latlngType.isRequired,
    radius: PropTypes.number,
  };

  componentWillMount () {
    super.componentWillMount()
    const { center, ...props } = this.props
    this.leafletElement = circleMarker(center, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.center !== prevProps.center) {
      this.leafletElement.setLatLng(this.props.center)
    }
    if (this.props.radius !== prevProps.radius) {
      this.leafletElement.setRadius(this.props.radius)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}

/* @flow */

import { circle } from 'leaflet'
import { PropTypes } from 'react'

import latlngType from './types/latlng'
import Path from './Path'

export default class Circle extends Path {
  static propTypes = {
    center: latlngType.isRequired,
    radius: PropTypes.number.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { center, radius, ...props } = this.props
    this.leafletElement = circle(center, radius, props)
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

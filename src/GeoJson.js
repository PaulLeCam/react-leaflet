/* @flow */

import { geoJson } from 'leaflet'
import { isFunction } from 'lodash'
import { PropTypes } from 'react'

import childrenType from './types/children'
import Path from './Path'

export default class GeoJson extends Path {
  static propTypes = {
    children: childrenType,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { data, ...props } = this.props
    this.leafletElement = geoJson(data, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (isFunction(this.props.style)) {
      this.setStyle(this.props.style)
    } else {
      this.setStyleIfChanged(prevProps, this.props)
    }
  }
}

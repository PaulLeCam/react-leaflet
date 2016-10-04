/* @flow */

import { geoJSON } from 'leaflet'
import { isFunction } from 'lodash'
import { PropTypes } from 'react'

import Path from './Path'

export default class GeoJSON extends Path {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { data, ...props } = this.props
    this.leafletElement = geoJSON(data, this.getOptions(props))
  }

  componentDidUpdate (prevProps: Object) {
    if (isFunction(this.props.style)) {
      this.setStyle(this.props.style)
    } else {
      this.setStyleIfChanged(prevProps, this.props)
    }
  }
}

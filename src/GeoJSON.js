/* @flow */

import { geoJSON } from 'leaflet'
import { isFunction } from 'lodash'
import { PropTypes } from 'react'

import paneType from './types/pane'

import Path from './Path'

export default class GeoJSON extends Path {
  static propTypes = {
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  };

  static contextTypes = {
    ...(Path.contextTypes || {}),
    pane: paneType,
  };

  componentWillMount () {
    super.componentWillMount()
    const { data, ...props } = this.props
    this.leafletElement = geoJSON(data, {
      ...props,
      pane: this.context.pane,
    })
  }

  componentDidUpdate (prevProps: Object) {
    if (isFunction(this.props.style)) {
      this.setStyle(this.props.style)
    } else {
      this.setStyleIfChanged(prevProps, this.props)
    }
  }
}

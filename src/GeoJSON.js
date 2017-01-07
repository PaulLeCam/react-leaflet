// @flow

import { geoJSON } from 'leaflet'
import { isFunction } from 'lodash'
import { PropTypes } from 'react'

import childrenType from './types/children'
import Path from './Path'

export default class GeoJSON extends Path {
  static propTypes = {
    children: childrenType,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  }

  createLeafletElement (props: Object): Object {
    const { data, ...options } = props
    return geoJSON(data, this.getOptions(options))
  }

  updateLeafletElement (fromProps: Object, toProps: Object) {
    if (isFunction(toProps.style)) {
      this.setStyle(toProps.style)
    } else {
      this.setStyleIfChanged(fromProps, toProps)
    }
  }
}

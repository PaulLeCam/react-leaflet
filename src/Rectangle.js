// @flow

import { rectangle } from 'leaflet'
import PropTypes from 'prop-types'

import boundsType from './propTypes/bounds'
import childrenType from './propTypes/children'

import Path from './Path'

export default class Rectangle extends Path {
  static propTypes = {
    children: childrenType,
    bounds: boundsType.isRequired,
    popupContainer: PropTypes.object,
  }

  createLeafletElement(props: Object): Object {
    const { bounds, ...options } = props
    return rectangle(bounds, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds(toProps.bounds)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

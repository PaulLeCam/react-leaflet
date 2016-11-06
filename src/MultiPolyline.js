/* @flow */

import { multiPolyline } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import latlngListType from './types/latlngList'
import Path from './Path'

export default class MultiPolyline extends Path {
  static propTypes = {
    children: childrenType,
    polylines: PropTypes.arrayOf(latlngListType).isRequired,
    popupContainer: PropTypes.object,
  };

  componentWillMount () {
    super.componentWillMount()
    const { polylines, ...props } = this.props
    this.leafletElement = multiPolyline(polylines, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.polylines !== prevProps.polylines) {
      this.leafletElement.setLatLngs(this.props.polylines)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}

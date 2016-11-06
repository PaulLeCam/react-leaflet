/* @flow */

import { polyline } from 'leaflet'

import childrenType from './types/children'
import latlngListType from './types/latlngList'
import Path from './Path'

export default class Polyline extends Path {
  static propTypes = {
    children: childrenType,
    positions: latlngListType.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { positions, ...props } = this.props
    this.leafletElement = polyline(positions, props)
  }

  componentDidUpdate (prevProps: Object) {
    if (this.props.positions !== prevProps.positions) {
      this.leafletElement.setLatLngs(this.props.positions)
    }
    this.setStyleIfChanged(prevProps, this.props)
  }
}

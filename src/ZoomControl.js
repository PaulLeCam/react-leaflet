/* @flow */

import { control } from 'leaflet'
import { PropTypes } from 'react'

import MapControl from './MapControl'
import controlPositionType from './types/controlPosition'

export default class ZoomControl extends MapControl {
  static propTypes = {
    position: controlPositionType,
    zoomInText: PropTypes.string,
    zoomInTitle: PropTypes.string,
    zoomOutText: PropTypes.string,
    zoomOutTitle: PropTypes.string,
  };

  componentWillMount () {
    this.leafletElement = control.zoom(this.props)
  }
}

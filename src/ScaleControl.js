/* @flow */

import { control } from 'leaflet'
import { PropTypes } from 'react'

import controlPositionType from './types/controlPosition'
import MapControl from './MapControl'

export default class ScaleControl extends MapControl {
  static propTypes = {
    imperial: PropTypes.bool,
    maxWidth: PropTypes.number,
    metric: PropTypes.bool,
    position: controlPositionType,
    updateWhenIdle: PropTypes.bool,
  };

  componentWillMount () {
    this.leafletElement = control.scale(this.props)
  }
}

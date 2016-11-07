/* @flow */

import { control } from 'leaflet'
import { PropTypes } from 'react'

import controlPositionType from './types/controlPosition'
import MapControl from './MapControl'

export default class AttributionControl extends MapControl {
  static propTypes = {
    position: controlPositionType,
    prefix: PropTypes.string,
  };

  componentWillMount () {
    this.leafletElement = control.attribution(this.props)
  }
}

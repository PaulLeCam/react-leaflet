/* @flow */

import { control } from 'leaflet'
import { PropTypes } from 'react'

import MapControl from './MapControl'

export default class ScaleControl extends MapControl {
  static propTypes = {
    imperial: PropTypes.bool,
    maxWidth: PropTypes.number,
    metric: PropTypes.bool,
    updateWhenIdle: PropTypes.bool,
  };

  componentWillMount () {
    this.leafletElement = control.scale(this.props)
  }
}

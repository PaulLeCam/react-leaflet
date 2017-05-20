// @flow

import { control } from 'leaflet'
import PropTypes from 'prop-types'

import controlPositionType from './propTypes/controlPosition'

import MapControl from './MapControl'

export default class ZoomControl extends MapControl {
  static propTypes = {
    position: controlPositionType,
    zoomInText: PropTypes.string,
    zoomInTitle: PropTypes.string,
    zoomOutText: PropTypes.string,
    zoomOutTitle: PropTypes.string,
  }

  createLeafletElement(props: Object): Object {
    return control.zoom(props)
  }
}

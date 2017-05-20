// @flow

import { control } from 'leaflet'
import PropTypes from 'prop-types'

import controlPositionType from './propTypes/controlPosition'

import MapControl from './MapControl'

export default class AttributionControl extends MapControl {
  static propTypes = {
    position: controlPositionType,
    prefix: PropTypes.string,
  }

  createLeafletElement(props: Object): Object {
    return control.attribution(props)
  }
}

// @flow

import { LatLngBounds } from 'leaflet'
import PropTypes from 'prop-types'

import latlngList from './latlngList'

export default PropTypes.oneOfType([
  PropTypes.instanceOf(LatLngBounds),
  latlngList,
])

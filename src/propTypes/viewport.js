// @flow

import PropTypes from 'prop-types'

import latlng from './latlng'

export default PropTypes.shape({
  center: latlng,
  zoom: PropTypes.number,
})

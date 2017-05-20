// @flow

import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  // [Number, Number]
  PropTypes.arrayOf(PropTypes.number),
  // {lat: Number, lng: Number}
  PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  // {lat: Number, lon: Number}
  PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
])

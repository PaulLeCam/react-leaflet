// @flow

import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  // [number, number]
  PropTypes.arrayOf(PropTypes.number),
  // {lat: number, lng: number}
  PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  // {lat: number, lon: number}
  PropTypes.shape({
    lat: PropTypes.number,
    lon: PropTypes.number,
  }),
])

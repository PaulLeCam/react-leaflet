// @flow

import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.number), // [number, number]
  PropTypes.shape({ lat: PropTypes.number, lng: PropTypes.number }),
  PropTypes.shape({ lat: PropTypes.number, lon: PropTypes.number }),
])

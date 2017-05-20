// @flow

import PropTypes from 'prop-types'

export default PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

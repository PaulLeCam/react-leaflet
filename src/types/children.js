// @flow

import { PropTypes } from 'react'

export default PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
])

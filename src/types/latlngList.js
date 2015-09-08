import { PropTypes } from 'react';

import latlng from './latlng';

export default PropTypes.oneOfType([
  PropTypes.arrayOf(latlng),
  PropTypes.arrayOf(PropTypes.arrayOf(latlng))
]);

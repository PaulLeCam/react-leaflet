import React from 'react';
import Leaflet from 'leaflet';

import latlngList from './latlngList';

export default React.PropTypes.oneOfType([
  React.PropTypes.instanceOf(Leaflet.LatLngBounds),
  latlngList,
]);

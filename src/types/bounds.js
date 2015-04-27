import React from "react";
import Leaflet from "leaflet-headless";

import latlngList from "./latlngList";

export default React.PropTypes.oneOfType([
  React.PropTypes.instanceOf(Leaflet.LatLngBounds),
  latlngList
]);

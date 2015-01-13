var React = require("react");
var Leaflet = require("leaflet");

var latlngList = require("./latlngList");

module.exports = React.PropTypes.oneOfType([
  React.PropTypes.instanceOf(Leaflet.LatLngBounds),
  latlngList
]);

"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var Leaflet = _interopRequire(require("leaflet"));

var latlngList = _interopRequire(require("./latlngList"));

module.exports = React.PropTypes.oneOfType([React.PropTypes.instanceOf(Leaflet.LatLngBounds), latlngList]);
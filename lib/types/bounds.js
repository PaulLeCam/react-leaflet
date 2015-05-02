"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _Leaflet = require("leaflet");

var _Leaflet2 = _interopRequireDefault(_Leaflet);

var _latlngList = require("./latlngList");

var _latlngList2 = _interopRequireDefault(_latlngList);

exports["default"] = _React2["default"].PropTypes.oneOfType([_React2["default"].PropTypes.instanceOf(_Leaflet2["default"].LatLngBounds), _latlngList2["default"]]);
module.exports = exports["default"];
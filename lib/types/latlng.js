"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react");

var _React2 = _interopRequireWildcard(_React);

var Type = _React2["default"].PropTypes;

exports["default"] = Type.oneOfType([
// [Number, Number]
Type.arrayOf(Type.number),
// {lat: Number, lng: Number}
Type.shape({
  lat: Type.number,
  lng: Type.number
}),
// {lat: Number, lon: Number}
Type.shape({
  lat: Type.number,
  lon: Type.number
})]);
module.exports = exports["default"];
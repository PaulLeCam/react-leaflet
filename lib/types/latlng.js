"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

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
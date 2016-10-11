'use strict';

exports.__esModule = true;

var _react = require('react');

exports.default = _react.PropTypes.oneOfType([
// [Number, Number]
_react.PropTypes.arrayOf(_react.PropTypes.number),
// {lat: Number, lng: Number}
_react.PropTypes.shape({
  lat: _react.PropTypes.number,
  lng: _react.PropTypes.number
}),
// {lat: Number, lon: Number}
_react.PropTypes.shape({
  lat: _react.PropTypes.number,
  lon: _react.PropTypes.number
})]);
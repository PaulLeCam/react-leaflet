'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _leaflet = require('leaflet');

var _latlngList = require('./latlngList');

var _latlngList2 = _interopRequireDefault(_latlngList);

exports['default'] = _react.PropTypes.oneOfType([_react.PropTypes.instanceOf(_leaflet.LatLngBounds), _latlngList2['default']]);
module.exports = exports['default'];
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _leaflet = require('leaflet');

var _leaflet2 = _interopRequireDefault(_leaflet);

var _latlngList = require('./latlngList');

var _latlngList2 = _interopRequireDefault(_latlngList);

exports['default'] = _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.instanceOf(_leaflet2['default'].LatLngBounds), _latlngList2['default']]);
module.exports = exports['default'];
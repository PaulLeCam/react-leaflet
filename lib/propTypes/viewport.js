'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _latlng = require('./latlng');

var _latlng2 = _interopRequireDefault(_latlng);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.shape({
  center: _latlng2.default,
  zoom: _propTypes2.default.number
});
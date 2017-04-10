'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _propTypes2.default.oneOfType([
// [Number, Number]
_propTypes2.default.arrayOf(_propTypes2.default.number),
// {lat: Number, lng: Number}
_propTypes2.default.shape({
  lat: _propTypes2.default.number,
  lng: _propTypes2.default.number
}),
// {lat: Number, lon: Number}
_propTypes2.default.shape({
  lat: _propTypes2.default.number,
  lon: _propTypes2.default.number
})]);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _controlPosition = require('./propTypes/controlPosition');

var _controlPosition2 = _interopRequireDefault(_controlPosition);

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ZoomControl = function (_MapControl) {
  (0, _inherits3.default)(ZoomControl, _MapControl);

  function ZoomControl() {
    (0, _classCallCheck3.default)(this, ZoomControl);
    return (0, _possibleConstructorReturn3.default)(this, (ZoomControl.__proto__ || (0, _getPrototypeOf2.default)(ZoomControl)).apply(this, arguments));
  }

  (0, _createClass3.default)(ZoomControl, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      return _leaflet.control.zoom(props);
    }
  }]);
  return ZoomControl;
}(_MapControl3.default);

ZoomControl.propTypes = {
  position: _controlPosition2.default,
  zoomInText: _propTypes2.default.string,
  zoomInTitle: _propTypes2.default.string,
  zoomOutText: _propTypes2.default.string,
  zoomOutTitle: _propTypes2.default.string
};
exports.default = ZoomControl;
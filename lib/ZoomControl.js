'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _MapControl2 = require('./MapControl');

var _MapControl3 = _interopRequireDefault(_MapControl2);

var _controlPosition = require('./types/controlPosition');

var _controlPosition2 = _interopRequireDefault(_controlPosition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ZoomControl = function (_MapControl) {
  _inherits(ZoomControl, _MapControl);

  function ZoomControl() {
    _classCallCheck(this, ZoomControl);

    return _possibleConstructorReturn(this, _MapControl.apply(this, arguments));
  }

  ZoomControl.prototype.createLeafletElement = function createLeafletElement(props) {
    return _leaflet.control.zoom(props);
  };

  return ZoomControl;
}(_MapControl3.default);

ZoomControl.propTypes = {
  position: _controlPosition2.default,
  zoomInText: _react.PropTypes.string,
  zoomInTitle: _react.PropTypes.string,
  zoomOutText: _react.PropTypes.string,
  zoomOutTitle: _react.PropTypes.string
};
exports.default = ZoomControl;
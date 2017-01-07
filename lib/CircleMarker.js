'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var CircleMarker = function (_Path) {
  _inherits(CircleMarker, _Path);

  function CircleMarker() {
    _classCallCheck(this, CircleMarker);

    return _possibleConstructorReturn(this, _Path.apply(this, arguments));
  }

  CircleMarker.prototype.createLeafletElement = function createLeafletElement(props) {
    var center = props.center,
        options = _objectWithoutProperties(props, ['center']);

    return (0, _leaflet.circleMarker)(center, this.getOptions(options));
  };

  CircleMarker.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center);
    }
    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius);
    }
  };

  return CircleMarker;
}(_Path3.default);

CircleMarker.propTypes = {
  center: _latlng2.default.isRequired,
  children: _children2.default,
  radius: _react.PropTypes.number
};
exports.default = CircleMarker;
'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _latlng = require('./types/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Marker = function (_MapLayer) {
  _inherits(Marker, _MapLayer);

  function Marker() {
    _classCallCheck(this, Marker);

    return _possibleConstructorReturn(this, _MapLayer.apply(this, arguments));
  }

  Marker.prototype.getChildContext = function getChildContext() {
    return {
      popupContainer: this.leafletElement
    };
  };

  Marker.prototype.createLeafletElement = function createLeafletElement(props) {
    var position = props.position,
        options = _objectWithoutProperties(props, ['position']);

    return (0, _leaflet.marker)(position, this.getOptions(options));
  };

  Marker.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.position !== fromProps.position) {
      this.leafletElement.setLatLng(toProps.position);
    }
    if (toProps.icon !== fromProps.icon) {
      this.leafletElement.setIcon(toProps.icon);
    }
    if (toProps.zIndexOffset !== fromProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(toProps.zIndexOffset);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
    if (toProps.draggable !== fromProps.draggable) {
      if (toProps.draggable) {
        this.leafletElement.dragging.enable();
      } else {
        this.leafletElement.dragging.disable();
      }
    }
  };

  Marker.prototype.render = function render() {
    return this.props.children || null;
  };

  return Marker;
}(_MapLayer3.default);

Marker.propTypes = {
  children: _children2.default,
  icon: _react.PropTypes.instanceOf(_leaflet.Icon),
  opacity: _react.PropTypes.number,
  position: _latlng2.default.isRequired,
  zIndexOffset: _react.PropTypes.number
};
Marker.childContextTypes = {
  popupContainer: _react.PropTypes.object
};
exports.default = Marker;
'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

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

  Marker.prototype.componentWillMount = function componentWillMount() {
    _MapLayer.prototype.componentWillMount.call(this);

    var _props = this.props,
        position = _props.position,
        props = _objectWithoutProperties(_props, ['position']);

    this.leafletElement = (0, _leaflet.marker)(position, this.getOptions(props));
  };

  Marker.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    if (this.props.position !== prevProps.position) {
      this.leafletElement.setLatLng(this.props.position);
    }
    if (this.props.icon !== prevProps.icon) {
      this.leafletElement.setIcon(this.props.icon);
    }
    if (this.props.zIndexOffset !== prevProps.zIndexOffset) {
      this.leafletElement.setZIndexOffset(this.props.zIndexOffset);
    }
    if (this.props.opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(this.props.opacity);
    }
    if (this.props.draggable !== prevProps.draggable) {
      if (this.props.draggable) {
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
  icon: _react.PropTypes.instanceOf(_leaflet.Icon),
  opacity: _react.PropTypes.number,
  position: _latlng2.default.isRequired,
  zIndexOffset: _react.PropTypes.number
};
Marker.childContextTypes = {
  popupContainer: _react.PropTypes.object
};
exports.default = Marker;
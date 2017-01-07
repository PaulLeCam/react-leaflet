'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var GridLayer = function (_MapLayer) {
  _inherits(GridLayer, _MapLayer);

  function GridLayer() {
    _classCallCheck(this, GridLayer);

    return _possibleConstructorReturn(this, _MapLayer.apply(this, arguments));
  }

  GridLayer.prototype.createLeafletElement = function createLeafletElement(props) {
    return (0, _leaflet.gridLayer)(this.getOptions(props));
  };

  GridLayer.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    var opacity = toProps.opacity,
        zIndex = toProps.zIndex;

    if (opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(opacity);
    }
    if (zIndex !== fromProps.zIndex) {
      this.leafletElement.setZIndex(zIndex);
    }
  };

  GridLayer.prototype.render = function render() {
    return null;
  };

  return GridLayer;
}(_MapLayer3.default);

GridLayer.propTypes = {
  children: _children2.default,
  opacity: _react.PropTypes.number,
  zIndex: _react.PropTypes.number
};
exports.default = GridLayer;
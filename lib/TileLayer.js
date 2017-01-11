'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _GridLayer2 = require('./GridLayer');

var _GridLayer3 = _interopRequireDefault(_GridLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TileLayer = function (_GridLayer) {
  _inherits(TileLayer, _GridLayer);

  function TileLayer() {
    _classCallCheck(this, TileLayer);

    return _possibleConstructorReturn(this, _GridLayer.apply(this, arguments));
  }

  TileLayer.prototype.createLeafletElement = function createLeafletElement(props) {
    var url = props.url,
        options = _objectWithoutProperties(props, ['url']);

    return (0, _leaflet.tileLayer)(url, this.getOptions(options));
  };

  TileLayer.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url);
    }
  };

  return TileLayer;
}(_GridLayer3.default);

TileLayer.propTypes = {
  children: _children2.default,
  opacity: _react.PropTypes.number,
  url: _react.PropTypes.string.isRequired,
  zIndex: _react.PropTypes.number
};
exports.default = TileLayer;
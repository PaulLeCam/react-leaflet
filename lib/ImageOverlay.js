'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _bounds = require('./types/bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ImageOverlay = function (_MapLayer) {
  _inherits(ImageOverlay, _MapLayer);

  function ImageOverlay() {
    _classCallCheck(this, ImageOverlay);

    return _possibleConstructorReturn(this, _MapLayer.apply(this, arguments));
  }

  ImageOverlay.prototype.getChildContext = function getChildContext() {
    return {
      popupContainer: this.leafletElement
    };
  };

  ImageOverlay.prototype.createLeafletElement = function createLeafletElement(props) {
    var bounds = props.bounds,
        url = props.url,
        options = _objectWithoutProperties(props, ['bounds', 'url']);

    return (0, _leaflet.imageOverlay)(url, bounds, this.getOptions(options));
  };

  ImageOverlay.prototype.updateLeafletElement = function updateLeafletElement(fromProps, toProps) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url);
    }
    if (toProps.opacity !== fromProps.opacity) {
      this.leafletElement.setOpacity(toProps.opacity);
    }
  };

  return ImageOverlay;
}(_MapLayer3.default);

ImageOverlay.propTypes = {
  attribution: _react.PropTypes.string,
  bounds: _bounds2.default.isRequired,
  children: _children2.default,
  opacity: _react.PropTypes.number,
  url: _react.PropTypes.string.isRequired
};
ImageOverlay.childContextTypes = {
  popupContainer: _react.PropTypes.object
};
exports.default = ImageOverlay;
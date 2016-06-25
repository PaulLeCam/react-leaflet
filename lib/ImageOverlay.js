'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _leaflet = require('leaflet');

var _react = require('react');

var _bounds = require('./types/bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ImageOverlay = function (_MapLayer) {
  _inherits(ImageOverlay, _MapLayer);

  function ImageOverlay() {
    _classCallCheck(this, ImageOverlay);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(ImageOverlay).apply(this, arguments));
  }

  _createClass(ImageOverlay, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(ImageOverlay.prototype), 'componentWillMount', this).call(this);
      var _props = this.props;
      var bounds = _props.bounds;
      var url = _props.url;

      var props = _objectWithoutProperties(_props, ['bounds', 'url']);

      this.leafletElement = (0, _leaflet.imageOverlay)(url, bounds, props);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (this.props.url !== prevProps.url) {
        this.leafletElement.setUrl(this.props.url);
      }
      if (this.props.opacity !== prevProps.opacity) {
        this.leafletElement.setOpacity(this.props.opacity);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return ImageOverlay;
}(_MapLayer3.default);

ImageOverlay.propTypes = {
  attribution: _react.PropTypes.string,
  bounds: _bounds2.default.isRequired,
  opacity: _react.PropTypes.number,
  url: _react.PropTypes.string.isRequired
};
exports.default = ImageOverlay;
'use strict';

exports.__esModule = true;

var _leaflet = require('leaflet');

var _react = require('react');

var _BaseTileLayer2 = require('./BaseTileLayer');

var _BaseTileLayer3 = _interopRequireDefault(_BaseTileLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var TileLayer = function (_BaseTileLayer) {
  _inherits(TileLayer, _BaseTileLayer);

  function TileLayer() {
    _classCallCheck(this, TileLayer);

    return _possibleConstructorReturn(this, _BaseTileLayer.apply(this, arguments));
  }

  TileLayer.prototype.componentWillMount = function componentWillMount() {
    _BaseTileLayer.prototype.componentWillMount.call(this);
    var _props = this.props;
    var url = _props.url;

    var props = _objectWithoutProperties(_props, ['url']);

    this.leafletElement = (0, _leaflet.tileLayer)(url, props);
  };

  TileLayer.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    _BaseTileLayer.prototype.componentDidUpdate.call(this, prevProps);
    var url = this.props.url;

    if (url !== prevProps.url) {
      this.leafletElement.setUrl(url);
    }
  };

  return TileLayer;
}(_BaseTileLayer3.default);

TileLayer.propTypes = {
  url: _react.PropTypes.string.isRequired
};
exports.default = TileLayer;
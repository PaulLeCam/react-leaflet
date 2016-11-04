'use strict';

exports.__esModule = true;

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _leaflet = require('leaflet');

var _react = require('react');

var _GridLayer2 = require('./GridLayer');

var _GridLayer3 = _interopRequireDefault(_GridLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var WMSTileLayer = function (_GridLayer) {
  _inherits(WMSTileLayer, _GridLayer);

  function WMSTileLayer() {
    _classCallCheck(this, WMSTileLayer);

    return _possibleConstructorReturn(this, _GridLayer.apply(this, arguments));
  }

  WMSTileLayer.prototype.componentWillMount = function componentWillMount() {
    _GridLayer.prototype.componentWillMount.call(this);

    var _props = this.props,
        url = _props.url,
        props = _objectWithoutProperties(_props, ['url']);

    this.leafletElement = _leaflet.tileLayer.wms(url, this.getOptions(props));
  };

  WMSTileLayer.prototype.componentDidUpdate = function componentDidUpdate(prevProps) {
    var prevUrl = prevProps.url,
        prevParams = _objectWithoutProperties(prevProps, ['url']);

    var _props2 = this.props,
        url = _props2.url,
        params = _objectWithoutProperties(_props2, ['url']);

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url);
    }
    if (!(0, _isEqual3.default)(params, prevParams)) {
      this.leafletElement.setParams(params);
    }
  };

  return WMSTileLayer;
}(_GridLayer3.default);

WMSTileLayer.propTypes = {
  url: _react.PropTypes.string.isRequired
};
exports.default = WMSTileLayer;
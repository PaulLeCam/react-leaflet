'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _GridLayer2 = require('./GridLayer');

var _GridLayer3 = _interopRequireDefault(_GridLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WMSTileLayer = function (_GridLayer) {
  (0, _inherits3.default)(WMSTileLayer, _GridLayer);

  function WMSTileLayer() {
    (0, _classCallCheck3.default)(this, WMSTileLayer);
    return (0, _possibleConstructorReturn3.default)(this, (WMSTileLayer.__proto__ || (0, _getPrototypeOf2.default)(WMSTileLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(WMSTileLayer, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var url = props.url,
          options = (0, _objectWithoutProperties3.default)(props, ['url']);

      return _leaflet.tileLayer.wms(url, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      (0, _get3.default)(WMSTileLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(WMSTileLayer.prototype), 'updateLeafletElement', this).call(this, fromProps, toProps);

      var prevUrl = fromProps.url,
          _po = fromProps.opacity,
          _pz = fromProps.zIndex,
          prevParams = (0, _objectWithoutProperties3.default)(fromProps, ['url', 'opacity', 'zIndex']);
      var url = toProps.url,
          _o = toProps.opacity,
          _z = toProps.zIndex,
          params = (0, _objectWithoutProperties3.default)(toProps, ['url', 'opacity', 'zIndex']);


      if (url !== prevUrl) {
        this.leafletElement.setUrl(url);
      }
      if (!(0, _isEqual3.default)(params, prevParams)) {
        this.leafletElement.setParams(params);
      }
    }
  }]);
  return WMSTileLayer;
}(_GridLayer3.default);

WMSTileLayer.propTypes = {
  children: _children2.default,
  opacity: _propTypes2.default.number,
  url: _propTypes2.default.string.isRequired,
  zIndex: _propTypes2.default.number
};
exports.default = WMSTileLayer;
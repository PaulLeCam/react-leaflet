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

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _GridLayer2 = require('./GridLayer');

var _GridLayer3 = _interopRequireDefault(_GridLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TileLayer = function (_GridLayer) {
  (0, _inherits3.default)(TileLayer, _GridLayer);

  function TileLayer() {
    (0, _classCallCheck3.default)(this, TileLayer);
    return (0, _possibleConstructorReturn3.default)(this, (TileLayer.__proto__ || (0, _getPrototypeOf2.default)(TileLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(TileLayer, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var url = props.url,
          options = (0, _objectWithoutProperties3.default)(props, ['url']);

      return (0, _leaflet.tileLayer)(url, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      (0, _get3.default)(TileLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(TileLayer.prototype), 'updateLeafletElement', this).call(this, fromProps, toProps);
      if (toProps.url !== fromProps.url) {
        this.leafletElement.setUrl(toProps.url);
      }
    }
  }]);
  return TileLayer;
}(_GridLayer3.default);

TileLayer.propTypes = {
  children: _children2.default,
  opacity: _propTypes2.default.number,
  url: _propTypes2.default.string.isRequired,
  zIndex: _propTypes2.default.number
};
exports.default = TileLayer;
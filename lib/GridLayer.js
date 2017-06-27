'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GridLayer = function (_MapLayer) {
  (0, _inherits3.default)(GridLayer, _MapLayer);

  function GridLayer() {
    (0, _classCallCheck3.default)(this, GridLayer);
    return (0, _possibleConstructorReturn3.default)(this, (GridLayer.__proto__ || (0, _getPrototypeOf2.default)(GridLayer)).apply(this, arguments));
  }

  (0, _createClass3.default)(GridLayer, [{
    key: 'getOptions',
    value: function getOptions(props) {
      var options = (0, _get3.default)(GridLayer.prototype.__proto__ || (0, _getPrototypeOf2.default)(GridLayer.prototype), 'getOptions', this).call(this, props);
      var map = this.context.map;
      return map ? (0, _extends3.default)({
        maxZoom: map.options.maxZoom,
        minZoom: map.options.minZoom
      }, options) : options;
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      return (0, _leaflet.gridLayer)(this.getOptions(props));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      var opacity = toProps.opacity,
          zIndex = toProps.zIndex;

      if (opacity !== fromProps.opacity) {
        this.leafletElement.setOpacity(opacity);
      }
      if (zIndex !== fromProps.zIndex) {
        this.leafletElement.setZIndex(zIndex);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);
  return GridLayer;
}(_MapLayer3.default);

GridLayer.propTypes = {
  children: _children2.default,
  opacity: _propTypes2.default.number,
  zIndex: _propTypes2.default.number
};
exports.default = GridLayer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _leaflet = require('leaflet');

var _layerContainer = require('./propTypes/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LayerGroup = function (_MapLayer) {
  (0, _inherits3.default)(LayerGroup, _MapLayer);

  function LayerGroup() {
    (0, _classCallCheck3.default)(this, LayerGroup);
    return (0, _possibleConstructorReturn3.default)(this, (LayerGroup.__proto__ || (0, _getPrototypeOf2.default)(LayerGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(LayerGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        layerContainer: this.leafletElement
      };
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement() {
      return (0, _leaflet.layerGroup)(this.getOptions());
    }
  }]);
  return LayerGroup;
}(_MapLayer3.default);

LayerGroup.childContextTypes = {
  layerContainer: _layerContainer2.default
};
exports.default = LayerGroup;
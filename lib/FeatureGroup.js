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

var _get2 = require('babel-runtime/helpers/get');

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _layerContainer = require('./propTypes/layerContainer');

var _layerContainer2 = _interopRequireDefault(_layerContainer);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FeatureGroup = function (_Path) {
  (0, _inherits3.default)(FeatureGroup, _Path);

  function FeatureGroup() {
    (0, _classCallCheck3.default)(this, FeatureGroup);
    return (0, _possibleConstructorReturn3.default)(this, (FeatureGroup.__proto__ || (0, _getPrototypeOf2.default)(FeatureGroup)).apply(this, arguments));
  }

  (0, _createClass3.default)(FeatureGroup, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        layerContainer: this.leafletElement,
        popupContainer: this.leafletElement
      };
    }
  }, {
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      return (0, _leaflet.featureGroup)(this.getOptions(props));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      (0, _get3.default)(FeatureGroup.prototype.__proto__ || (0, _getPrototypeOf2.default)(FeatureGroup.prototype), 'componentDidMount', this).call(this);
      this.setStyle(this.props);
    }
  }]);
  return FeatureGroup;
}(_Path3.default);

FeatureGroup.childContextTypes = {
  children: _children2.default,
  layerContainer: _layerContainer2.default,
  popupContainer: _propTypes2.default.object
};
exports.default = FeatureGroup;
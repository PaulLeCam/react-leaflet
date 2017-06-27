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

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _latlngList = require('./propTypes/latlngList');

var _latlngList2 = _interopRequireDefault(_latlngList);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var multiLatLngListType = _propTypes2.default.arrayOf(_latlngList2.default);

var Polygon = function (_Path) {
  (0, _inherits3.default)(Polygon, _Path);

  function Polygon() {
    (0, _classCallCheck3.default)(this, Polygon);
    return (0, _possibleConstructorReturn3.default)(this, (Polygon.__proto__ || (0, _getPrototypeOf2.default)(Polygon)).apply(this, arguments));
  }

  (0, _createClass3.default)(Polygon, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var positions = props.positions,
          options = (0, _objectWithoutProperties3.default)(props, ['positions']);

      return (0, _leaflet.polygon)(positions, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.positions !== fromProps.positions) {
        this.leafletElement.setLatLngs(toProps.positions);
      }
      this.setStyleIfChanged(fromProps, toProps);
    }
  }]);
  return Polygon;
}(_Path3.default);

Polygon.propTypes = {
  children: _children2.default,
  popupContainer: _propTypes2.default.object,
  positions: _propTypes2.default.oneOfType([_latlngList2.default, multiLatLngListType, _propTypes2.default.arrayOf(multiLatLngListType)]).isRequired
};
exports.default = Polygon;
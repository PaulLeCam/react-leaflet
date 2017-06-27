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

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _leaflet = require('leaflet');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GeoJSON = function (_Path) {
  (0, _inherits3.default)(GeoJSON, _Path);

  function GeoJSON() {
    (0, _classCallCheck3.default)(this, GeoJSON);
    return (0, _possibleConstructorReturn3.default)(this, (GeoJSON.__proto__ || (0, _getPrototypeOf2.default)(GeoJSON)).apply(this, arguments));
  }

  (0, _createClass3.default)(GeoJSON, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var data = props.data,
          options = (0, _objectWithoutProperties3.default)(props, ['data']);

      return (0, _leaflet.geoJSON)(data, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if ((0, _isFunction3.default)(toProps.style)) {
        this.setStyle(toProps.style);
      } else {
        this.setStyleIfChanged(fromProps, toProps);
      }
    }
  }]);
  return GeoJSON;
}(_Path3.default);

GeoJSON.propTypes = {
  children: _children2.default,
  data: _propTypes2.default.oneOfType([_propTypes2.default.array, _propTypes2.default.object]).isRequired
};
exports.default = GeoJSON;
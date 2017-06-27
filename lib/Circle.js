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

var _latlng = require('./propTypes/latlng');

var _latlng2 = _interopRequireDefault(_latlng);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Circle = function (_Path) {
  (0, _inherits3.default)(Circle, _Path);

  function Circle() {
    (0, _classCallCheck3.default)(this, Circle);
    return (0, _possibleConstructorReturn3.default)(this, (Circle.__proto__ || (0, _getPrototypeOf2.default)(Circle)).apply(this, arguments));
  }

  (0, _createClass3.default)(Circle, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var center = props.center,
          radius = props.radius,
          options = (0, _objectWithoutProperties3.default)(props, ['center', 'radius']);

      return (0, _leaflet.circle)(center, radius, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.center !== fromProps.center) {
        this.leafletElement.setLatLng(toProps.center);
      }
      if (toProps.radius !== fromProps.radius) {
        this.leafletElement.setRadius(toProps.radius);
      }
    }
  }]);
  return Circle;
}(_Path3.default);

Circle.propTypes = {
  center: _latlng2.default.isRequired,
  children: _children2.default,
  radius: _propTypes2.default.number.isRequired
};
exports.default = Circle;
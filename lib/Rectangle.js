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

var _bounds = require('./propTypes/bounds');

var _bounds2 = _interopRequireDefault(_bounds);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _Path2 = require('./Path');

var _Path3 = _interopRequireDefault(_Path2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Rectangle = function (_Path) {
  (0, _inherits3.default)(Rectangle, _Path);

  function Rectangle() {
    (0, _classCallCheck3.default)(this, Rectangle);
    return (0, _possibleConstructorReturn3.default)(this, (Rectangle.__proto__ || (0, _getPrototypeOf2.default)(Rectangle)).apply(this, arguments));
  }

  (0, _createClass3.default)(Rectangle, [{
    key: 'createLeafletElement',
    value: function createLeafletElement(props) {
      var bounds = props.bounds,
          options = (0, _objectWithoutProperties3.default)(props, ['bounds']);

      return (0, _leaflet.rectangle)(bounds, this.getOptions(options));
    }
  }, {
    key: 'updateLeafletElement',
    value: function updateLeafletElement(fromProps, toProps) {
      if (toProps.bounds !== fromProps.bounds) {
        this.leafletElement.setBounds(toProps.bounds);
      }
      this.setStyleIfChanged(fromProps, toProps);
    }
  }]);
  return Rectangle;
}(_Path3.default);

Rectangle.propTypes = {
  children: _children2.default,
  bounds: _bounds2.default.isRequired,
  popupContainer: _propTypes2.default.object
};
exports.default = Rectangle;
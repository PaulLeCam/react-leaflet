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

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _children = require('./propTypes/children');

var _children2 = _interopRequireDefault(_children);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OPTIONS = ['stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin', 'clickable', 'pointerEvents', 'className'];

var Path = function (_MapLayer) {
  (0, _inherits3.default)(Path, _MapLayer);

  function Path() {
    (0, _classCallCheck3.default)(this, Path);
    return (0, _possibleConstructorReturn3.default)(this, (Path.__proto__ || (0, _getPrototypeOf2.default)(Path)).apply(this, arguments));
  }

  (0, _createClass3.default)(Path, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      (0, _get3.default)(Path.prototype.__proto__ || (0, _getPrototypeOf2.default)(Path.prototype), 'componentDidUpdate', this).call(this, prevProps);
      this.setStyleIfChanged(prevProps, this.props);
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        popupContainer: this.leafletElement
      };
    }
  }, {
    key: 'getPathOptions',
    value: function getPathOptions(props) {
      return (0, _pick3.default)(props, OPTIONS);
    }
  }, {
    key: 'setStyle',
    value: function setStyle() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.leafletElement.setStyle(options);
    }
  }, {
    key: 'setStyleIfChanged',
    value: function setStyleIfChanged(fromProps, toProps) {
      var nextStyle = this.getPathOptions(toProps);
      if (!(0, _isEqual3.default)(nextStyle, this.getPathOptions(fromProps))) {
        this.setStyle(nextStyle);
      }
    }
  }]);
  return Path;
}(_MapLayer3.default);

Path.childContextTypes = {
  children: _children2.default,
  popupContainer: _propTypes2.default.object
};
exports.default = Path;
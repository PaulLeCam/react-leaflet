'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OPTIONS = ['stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin', 'clickable', 'pointerEvents', 'className'];

var Path = function (_MapLayer) {
  _inherits(Path, _MapLayer);

  function Path() {
    _classCallCheck(this, Path);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Path).apply(this, arguments));
  }

  _createClass(Path, [{
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
      var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

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
  popupContainer: _react.PropTypes.object
};
exports.default = Path;
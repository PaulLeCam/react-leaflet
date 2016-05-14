'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseTileLayer = function (_MapLayer) {
  _inherits(BaseTileLayer, _MapLayer);

  function BaseTileLayer() {
    _classCallCheck(this, BaseTileLayer);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseTileLayer).apply(this, arguments));
  }

  _createClass(BaseTileLayer, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var opacity = _props.opacity;
      var zIndex = _props.zIndex;

      if (opacity !== prevProps.opacity) {
        this.leafletElement.setOpacity(opacity);
      }
      if (zIndex !== prevProps.zIndex) {
        this.leafletElement.setZIndex(zIndex);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return null;
    }
  }]);

  return BaseTileLayer;
}(_MapLayer3.default);

BaseTileLayer.propTypes = {
  opacity: _react.PropTypes.number,
  zIndex: _react.PropTypes.number
};
exports.default = BaseTileLayer;
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _leaflet = require('leaflet');

var _react = require('react');

var _children = require('./types/children');

var _children2 = _interopRequireDefault(_children);

var _MapLayer2 = require('./MapLayer');

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var GridLayer = function (_MapLayer) {
  _inherits(GridLayer, _MapLayer);

  function GridLayer() {
    _classCallCheck(this, GridLayer);

    return _possibleConstructorReturn(this, (GridLayer.__proto__ || Object.getPrototypeOf(GridLayer)).apply(this, arguments));
  }

  _createClass(GridLayer, [{
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
  opacity: _react.PropTypes.number,
  zIndex: _react.PropTypes.number
};
exports.default = GridLayer;
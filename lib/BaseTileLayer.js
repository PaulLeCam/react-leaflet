"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _MapLayer2 = require("./MapLayer");

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

var BaseTileLayer = (function (_MapLayer) {
  function BaseTileLayer() {
    _classCallCheck(this, BaseTileLayer);

    if (_MapLayer != null) {
      _MapLayer.apply(this, arguments);
    }
  }

  _inherits(BaseTileLayer, _MapLayer);

  _createClass(BaseTileLayer, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var opacity = _props.opacity;
      var zIndex = _props.zIndex;

      if (opacity && opacity !== prevProps.opacity) {
        this.leafletElement.setOpacity(opacity);
      }
      if (zIndex && zIndex !== prevProps.zIndex) {
        this.leafletElement.setZIndex(zIndex);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return BaseTileLayer;
})(_MapLayer3["default"]);

exports["default"] = BaseTileLayer;

BaseTileLayer.propTypes = {
  opacity: _React2["default"].PropTypes.number,
  zIndex: _React2["default"].PropTypes.number
};
module.exports = exports["default"];
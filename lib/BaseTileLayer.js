"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var MapLayer = _interopRequire(require("./MapLayer"));

var BaseTileLayer = (function (_MapLayer) {
  function BaseTileLayer() {
    _classCallCheck(this, BaseTileLayer);

    if (_MapLayer != null) {
      _MapLayer.apply(this, arguments);
    }
  }

  _inherits(BaseTileLayer, _MapLayer);

  _createClass(BaseTileLayer, {
    componentDidUpdate: {
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
    },
    render: {
      value: function render() {
        return null;
      }
    }
  });

  return BaseTileLayer;
})(MapLayer);

module.exports = BaseTileLayer;

BaseTileLayer.propTypes = {
  opacity: React.PropTypes.number,
  zIndex: React.PropTypes.number
};
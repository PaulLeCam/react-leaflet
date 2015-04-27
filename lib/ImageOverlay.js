"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _Leaflet = require("leaflet-headless");

var _Leaflet2 = _interopRequireDefault(_Leaflet);

var _boundsType = require("./types/bounds");

var _boundsType2 = _interopRequireDefault(_boundsType);

var _MapLayer2 = require("./MapLayer");

var _MapLayer3 = _interopRequireDefault(_MapLayer2);

var ImageOverlay = (function (_MapLayer) {
  function ImageOverlay() {
    _classCallCheck(this, ImageOverlay);

    if (_MapLayer != null) {
      _MapLayer.apply(this, arguments);
    }
  }

  _inherits(ImageOverlay, _MapLayer);

  _createClass(ImageOverlay, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(ImageOverlay.prototype), "componentWillMount", this).call(this);
      var _props = this.props;
      var bounds = _props.bounds;
      var map = _props.map;
      var url = _props.url;

      var props = _objectWithoutProperties(_props, ["bounds", "map", "url"]);

      this.leafletElement = _Leaflet2["default"].imageOverlay(url, bounds, props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.url !== prevProps.url) {
        this.leafletElement.setUrl(this.props.url);
      }
      if (this.props.opacity !== prevProps.opacity) {
        this.leafletElement.setOpacity(this.props.opacity);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return null;
    }
  }]);

  return ImageOverlay;
})(_MapLayer3["default"]);

exports["default"] = ImageOverlay;

ImageOverlay.propTypes = {
  attribution: _React2["default"].PropTypes.string,
  bounds: _boundsType2["default"].isRequired,
  opacity: _React2["default"].PropTypes.number,
  url: _React2["default"].PropTypes.string.isRequired
};
module.exports = exports["default"];
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

var _BaseTileLayer2 = require("./BaseTileLayer");

var _BaseTileLayer3 = _interopRequireDefault(_BaseTileLayer2);

var WMSTileLayer = (function (_BaseTileLayer) {
  function WMSTileLayer() {
    _classCallCheck(this, WMSTileLayer);

    if (_BaseTileLayer != null) {
      _BaseTileLayer.apply(this, arguments);
    }
  }

  _inherits(WMSTileLayer, _BaseTileLayer);

  _createClass(WMSTileLayer, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(WMSTileLayer.prototype), "componentWillMount", this).call(this);
      var _props = this.props;
      var map = _props.map;
      var url = _props.url;

      var props = _objectWithoutProperties(_props, ["map", "url"]);

      this.leafletElement = _Leaflet2["default"].tileLayer.wms(url, props);
    }
  }]);

  return WMSTileLayer;
})(_BaseTileLayer3["default"]);

exports["default"] = WMSTileLayer;

WMSTileLayer.propTypes = {
  url: _React2["default"].PropTypes.string.isRequired
};
module.exports = exports["default"];
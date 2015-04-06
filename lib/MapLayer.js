"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _assign = require("lodash/object/assign");

var _assign2 = _interopRequireWildcard(_assign);

var _React = require("react");

var _React2 = _interopRequireWildcard(_React);

var _MapComponent2 = require("./MapComponent");

var _MapComponent3 = _interopRequireWildcard(_MapComponent2);

var MapLayer = (function (_MapComponent) {
  function MapLayer() {
    _classCallCheck(this, MapLayer);

    if (_MapComponent != null) {
      _MapComponent.apply(this, arguments);
    }
  }

  _inherits(MapLayer, _MapComponent);

  _createClass(MapLayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      _get(Object.getPrototypeOf(MapLayer.prototype), "componentDidMount", this).call(this);
      this.props.map.addLayer(this.leafletElement);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(MapLayer.prototype), "componentWillUnmount", this).call(this);
      this.props.map.removeLayer(this.leafletElement);
    }
  }, {
    key: "getClonedChildrenWithMap",
    value: function getClonedChildrenWithMap(extra) {
      var _props = this.props;
      var children = _props.children;
      var map = _props.map;

      var props = _assign2["default"]({ map: map }, extra);

      return _React2["default"].Children.map(children, function (child) {
        return child ? _React2["default"].cloneElement(child, props) : null;
      });
    }
  }]);

  return MapLayer;
})(_MapComponent3["default"]);

exports["default"] = MapLayer;
module.exports = exports["default"];
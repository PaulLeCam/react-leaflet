"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require("lodash/lang/isArray");

var _isArray2 = _interopRequireWildcard(_isArray);

var _uniqueId = require("lodash/utility/uniqueId");

var _uniqueId2 = _interopRequireWildcard(_uniqueId);

var _React = require("react");

var _React2 = _interopRequireWildcard(_React);

var _Leaflet = require("leaflet");

var _Leaflet2 = _interopRequireWildcard(_Leaflet);

var _boundsType = require("./types/bounds");

var _boundsType2 = _interopRequireWildcard(_boundsType);

var _latlngType = require("./types/latlng");

var _latlngType2 = _interopRequireWildcard(_latlngType);

var _MapComponent2 = require("./MapComponent");

var _MapComponent3 = _interopRequireWildcard(_MapComponent2);

var normalizeCenter = function normalizeCenter(pos) {
  return _isArray2["default"](pos) ? pos : [pos.lat, pos.lng || pos.lon];
};

var Map = (function (_MapComponent) {
  function Map(props) {
    _classCallCheck(this, Map);

    _get(Object.getPrototypeOf(Map.prototype), "constructor", this).call(this, props);
    this.state = {
      id: props.id || _uniqueId2["default"]("map")
    };
  }

  _inherits(Map, _MapComponent);

  _createClass(Map, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.leafletElement = _Leaflet2["default"].map(this.state.id, this.props);
      _get(Object.getPrototypeOf(Map.prototype), "componentDidMount", this).call(this);
      this.setState({ map: this.leafletElement });
    }
  }, {
    key: "shouldUpdateCenter",
    value: function shouldUpdateCenter(next, prev) {
      if (!prev) {
        return true;
      }next = normalizeCenter(next);
      prev = normalizeCenter(prev);
      return next[0] !== prev[0] || next[1] !== prev[1];
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _props = this.props;
      var center = _props.center;
      var zoom = _props.zoom;

      if (center && this.shouldUpdateCenter(center, prevProps.center)) {
        this.leafletElement.setView(center, zoom, { animate: false });
      } else if (zoom && zoom !== prevProps.zoom) {
        this.leafletElement.setZoom(zoom);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Map.prototype), "componentWillUnmount", this).call(this);
      this.leafletElement.remove();
    }
  }, {
    key: "render",
    value: function render() {
      var map = this.leafletElement;
      var children = map ? _React2["default"].Children.map(this.props.children, function (child) {
        return child ? _React2["default"].cloneElement(child, { map: map }) : null;
      }) : null;

      return _React2["default"].createElement(
        "div",
        { className: this.props.className, id: this.state.id },
        children
      );
    }
  }]);

  return Map;
})(_MapComponent3["default"]);

exports["default"] = Map;

Map.propTypes = {
  center: _latlngType2["default"],
  id: _React2["default"].PropTypes.string,
  maxBounds: _boundsType2["default"],
  maxZoom: _React2["default"].PropTypes.number,
  minZoom: _React2["default"].PropTypes.number,
  zoom: _React2["default"].PropTypes.number
};
module.exports = exports["default"];
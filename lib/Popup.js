"use strict";

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _objectWithoutProperties = function (obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _React = require("react");

var _React2 = _interopRequireWildcard(_React);

var _Leaflet = require("leaflet");

var _Leaflet2 = _interopRequireWildcard(_Leaflet);

var _latlngType = require("./types/latlng");

var _latlngType2 = _interopRequireWildcard(_latlngType);

var _MapComponent2 = require("./MapComponent");

var _MapComponent3 = _interopRequireWildcard(_MapComponent2);

var Popup = (function (_MapComponent) {
  function Popup() {
    _classCallCheck(this, Popup);

    if (_MapComponent != null) {
      _MapComponent.apply(this, arguments);
    }
  }

  _inherits(Popup, _MapComponent);

  _createClass(Popup, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Popup.prototype), "componentWillMount", this).call(this);
      var _props = this.props;
      var children = _props.children;
      var map = _props.map;

      var props = _objectWithoutProperties(_props, ["children", "map"]);

      this.leafletElement = _Leaflet2["default"].popup(props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _props2 = this.props;
      var children = _props2.children;
      var map = _props2.map;
      var popupContainer = _props2.popupContainer;
      var position = _props2.position;

      var props = _objectWithoutProperties(_props2, ["children", "map", "popupContainer", "position"]);

      if (children !== prevProps.children) {
        var content = _React2["default"].renderToStaticMarkup(children);
        if (popupContainer) {
          popupContainer.bindPopup(content, props);
        } else {
          var el = this.leafletElement;
          el.setContent(content);
          if (position !== prevProps.position) el.setLatLng(position);
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      _get(Object.getPrototypeOf(Popup.prototype), "componentWillUnmount", this).call(this);
      this.props.map.removeLayer(this.leafletElement);
    }
  }, {
    key: "render",
    value: function render() {
      var _props3 = this.props;
      var children = _props3.children;
      var map = _props3.map;
      var popupContainer = _props3.popupContainer;
      var position = _props3.position;

      var props = _objectWithoutProperties(_props3, ["children", "map", "popupContainer", "position"]);

      if (children) {
        var content = _React2["default"].renderToStaticMarkup(children);
        // Attach to container component
        if (popupContainer) {
          popupContainer.bindPopup(content, props);
          return null;
        }
        // Attach to a Map
        var el = this.leafletElement;
        el.setContent(content);
        if (position) el.setLatLng(position);
        el.openOn(map);
      }
      return null;
    }
  }]);

  return Popup;
})(_MapComponent3["default"]);

exports["default"] = Popup;

Popup.propTypes = {
  position: _latlngType2["default"]
};
module.exports = exports["default"];
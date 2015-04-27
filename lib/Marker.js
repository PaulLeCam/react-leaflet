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

var _Leaflet = require("leaflet-headless");

var _Leaflet2 = _interopRequireDefault(_Leaflet);

var _latlngType = require("./types/latlng");

var _latlngType2 = _interopRequireDefault(_latlngType);

var _PopupContainer2 = require("./PopupContainer");

var _PopupContainer3 = _interopRequireDefault(_PopupContainer2);

var Marker = (function (_PopupContainer) {
  function Marker() {
    _classCallCheck(this, Marker);

    if (_PopupContainer != null) {
      _PopupContainer.apply(this, arguments);
    }
  }

  _inherits(Marker, _PopupContainer);

  _createClass(Marker, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      _get(Object.getPrototypeOf(Marker.prototype), "componentWillMount", this).call(this);
      var _props = this.props;
      var map = _props.map;
      var position = _props.position;

      var props = _objectWithoutProperties(_props, ["map", "position"]);

      this.leafletElement = _Leaflet2["default"].marker(position, props);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.position !== prevProps.position) {
        this.leafletElement.setLatLng(this.props.position);
      }
    }
  }]);

  return Marker;
})(_PopupContainer3["default"]);

exports["default"] = Marker;

Marker.propTypes = {
  position: _latlngType2["default"].isRequired
};
module.exports = exports["default"];
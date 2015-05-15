(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _SimpleExample = require("./simple");

var _SimpleExample2 = _interopRequireDefault(_SimpleExample);

var _EventsExample = require("./events");

var _EventsExample2 = _interopRequireDefault(_EventsExample);

var _VectorLayersExample = require("./vector-layers");

var _VectorLayersExample2 = _interopRequireDefault(_VectorLayersExample);

var examples = _React2["default"].createElement(
  "div",
  null,
  _React2["default"].createElement(
    "h1",
    null,
    "React-Leaflet examples"
  ),
  _React2["default"].createElement(
    "h2",
    null,
    "Popup with Marker"
  ),
  _React2["default"].createElement(_SimpleExample2["default"], null),
  _React2["default"].createElement(
    "h2",
    null,
    "Events"
  ),
  _React2["default"].createElement(
    "p",
    null,
    "Click the map to show a marker at your detected location"
  ),
  _React2["default"].createElement(_EventsExample2["default"], null),
  _React2["default"].createElement(
    "h2",
    null,
    "Vector layers"
  ),
  _React2["default"].createElement(_VectorLayersExample2["default"], null)
);

_React2["default"].render(examples, document.getElementById("app"));

},{"./events":2,"./simple":3,"./vector-layers":4,"react":"react"}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _Map$TileLayer$Marker$Popup = require("react-leaflet");

var EventsExample = (function (_React$Component) {
  function EventsExample() {
    _classCallCheck(this, EventsExample);

    _get(Object.getPrototypeOf(EventsExample.prototype), "constructor", this).call(this);
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09
      }
    };
  }

  _inherits(EventsExample, _React$Component);

  _createClass(EventsExample, [{
    key: "handleClick",
    value: function handleClick() {
      this.refs.map.leafletElement.locate();
    }
  }, {
    key: "handleLocationFound",
    value: function handleLocationFound(e) {
      this.setState({
        hasLocation: true,
        latlng: e.latlng
      });
    }
  }, {
    key: "render",
    value: function render() {
      var marker = this.state.hasLocation ? _React2["default"].createElement(
        _Map$TileLayer$Marker$Popup.Marker,
        { position: this.state.latlng },
        _React2["default"].createElement(
          _Map$TileLayer$Marker$Popup.Popup,
          null,
          _React2["default"].createElement(
            "span",
            null,
            "You are here"
          )
        )
      ) : null;

      return _React2["default"].createElement(
        _Map$TileLayer$Marker$Popup.Map,
        { ref: "map",
          center: this.state.latlng,
          zoom: 13,
          onClick: this.handleClick.bind(this),
          onLocationfound: this.handleLocationFound.bind(this) },
        _React2["default"].createElement(_Map$TileLayer$Marker$Popup.TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
        }),
        marker
      );
    }
  }]);

  return EventsExample;
})(_React2["default"].Component);

exports["default"] = EventsExample;
module.exports = exports["default"];

},{"react":"react","react-leaflet":"react-leaflet"}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { desc = parent = getter = undefined; _again = false; var object = _x,
    property = _x2,
    receiver = _x3; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _Map$TileLayer$Marker$Popup = require("react-leaflet");

var SimpleExample = (function (_React$Component) {
  function SimpleExample() {
    _classCallCheck(this, SimpleExample);

    _get(Object.getPrototypeOf(SimpleExample.prototype), "constructor", this).call(this);
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  }

  _inherits(SimpleExample, _React$Component);

  _createClass(SimpleExample, [{
    key: "render",
    value: function render() {
      var position = [this.state.lat, this.state.lng];
      return _React2["default"].createElement(
        _Map$TileLayer$Marker$Popup.Map,
        { center: position, zoom: this.state.zoom },
        _React2["default"].createElement(_Map$TileLayer$Marker$Popup.TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
        }),
        _React2["default"].createElement(
          _Map$TileLayer$Marker$Popup.Marker,
          { position: position },
          _React2["default"].createElement(
            _Map$TileLayer$Marker$Popup.Popup,
            null,
            _React2["default"].createElement(
              "span",
              null,
              "A pretty CSS3 popup. ",
              _React2["default"].createElement("br", null),
              " Easily customizable."
            )
          )
        )
      );
    }
  }]);

  return SimpleExample;
})(_React2["default"].Component);

exports["default"] = SimpleExample;
module.exports = exports["default"];

},{"react":"react","react-leaflet":"react-leaflet"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

var _Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer = require("react-leaflet");

var VectorLayersExample = (function (_React$Component) {
  function VectorLayersExample() {
    _classCallCheck(this, VectorLayersExample);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(VectorLayersExample, _React$Component);

  _createClass(VectorLayersExample, [{
    key: "render",
    value: function render() {
      var center = [51.505, -0.09];

      var polyline = [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]];

      var multiPolyline = [[[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]], [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]]];

      var polygon = [[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]];

      var multiPolygon = [[[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]], [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]]];

      var rectangle = [[51.49, -0.08], [51.5, -0.06]];

      return _React2["default"].createElement(
        _Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.Map,
        { center: center, zoom: 13 },
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.TileLayer, {
          url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
          attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
        }),
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.Circle, { center: center, radius: 200, fillColor: "blue" }),
        _React2["default"].createElement(
          _Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.CircleMarker,
          { center: [51.51, -0.12], radius: 20, color: "red" },
          _React2["default"].createElement(
            _Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.Popup,
            null,
            _React2["default"].createElement(
              "span",
              null,
              "Popup in CircleMarker"
            )
          )
        ),
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.Polyline, { positions: polyline, color: "lime" }),
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.MultiPolyline, { polylines: multiPolyline, color: "lime" }),
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.Polygon, { positions: polygon, color: "purple" }),
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.MultiPolygon, { polygons: multiPolygon, color: "purple" }),
        _React2["default"].createElement(_Circle$CircleMarker$Map$MultiPolygon$MultiPolyline$Polygon$Polyline$Popup$Rectangle$TileLayer.Rectangle, { bounds: rectangle, color: "black" })
      );
    }
  }]);

  return VectorLayersExample;
})(_React2["default"].Component);

exports["default"] = VectorLayersExample;
module.exports = exports["default"];

},{"react":"react","react-leaflet":"react-leaflet"}]},{},[1]);

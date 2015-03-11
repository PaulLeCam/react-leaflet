(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./example/app.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var React = _interopRequire(require("react"));

var SimpleExample = _interopRequire(require("./simple"));

var EventsExample = _interopRequire(require("./events"));

var VectorLayersExample = _interopRequire(require("./vector-layers"));

var examples = React.createElement(
  "div",
  null,
  React.createElement(
    "h1",
    null,
    "React-Leaflet examples"
  ),
  React.createElement(
    "h2",
    null,
    "Popup with Marker"
  ),
  React.createElement(SimpleExample, null),
  React.createElement(
    "h2",
    null,
    "Events"
  ),
  React.createElement(
    "p",
    null,
    "Click the map to show a marker at your detected location"
  ),
  React.createElement(EventsExample, null),
  React.createElement(
    "h2",
    null,
    "Vector layers"
  ),
  React.createElement(VectorLayersExample, null)
);

React.render(examples, document.getElementById("app"));

},{"./events":"/Users/paul/dev/PaulLeCam/react-leaflet/example/events.js","./simple":"/Users/paul/dev/PaulLeCam/react-leaflet/example/simple.js","./vector-layers":"/Users/paul/dev/PaulLeCam/react-leaflet/example/vector-layers.js","react":"react"}],"/Users/paul/dev/PaulLeCam/react-leaflet/example/events.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var _reactLeaflet = require("react-leaflet");

var Map = _reactLeaflet.Map;
var TileLayer = _reactLeaflet.TileLayer;
var Marker = _reactLeaflet.Marker;
var Popup = _reactLeaflet.Popup;

var EventsExample = (function (_React$Component) {
  function EventsExample() {
    _classCallCheck(this, EventsExample);

    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09
      }
    };
  }

  _inherits(EventsExample, _React$Component);

  _createClass(EventsExample, {
    handleClick: {
      value: function handleClick() {
        this.refs.map.leafletElement.locate();
      }
    },
    handleLocationFound: {
      value: function handleLocationFound(e) {
        this.setState({
          hasLocation: true,
          latlng: e.latlng
        });
      }
    },
    render: {
      value: function render() {
        var marker = this.state.hasLocation ? React.createElement(
          Marker,
          { position: this.state.latlng },
          React.createElement(
            Popup,
            null,
            React.createElement(
              "span",
              null,
              "You are here"
            )
          )
        ) : null;

        return React.createElement(
          Map,
          { ref: "map",
            center: this.state.latlng,
            zoom: 13,
            onClick: this.handleClick.bind(this),
            onLocationfound: this.handleLocationFound.bind(this) },
          React.createElement(TileLayer, {
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
          }),
          marker
        );
      }
    }
  });

  return EventsExample;
})(React.Component);

module.exports = EventsExample;

},{"react":"react","react-leaflet":"react-leaflet"}],"/Users/paul/dev/PaulLeCam/react-leaflet/example/simple.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var _reactLeaflet = require("react-leaflet");

var Map = _reactLeaflet.Map;
var TileLayer = _reactLeaflet.TileLayer;
var Marker = _reactLeaflet.Marker;
var Popup = _reactLeaflet.Popup;

var SimpleExample = (function (_React$Component) {
  function SimpleExample() {
    _classCallCheck(this, SimpleExample);

    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13
    };
  }

  _inherits(SimpleExample, _React$Component);

  _createClass(SimpleExample, {
    render: {
      value: function render() {
        var position = [this.state.lat, this.state.lng];
        return React.createElement(
          Map,
          { center: position, zoom: this.state.zoom },
          React.createElement(TileLayer, {
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
          }),
          React.createElement(
            Marker,
            { position: position },
            React.createElement(
              Popup,
              null,
              React.createElement(
                "span",
                null,
                "A pretty CSS3 popup. ",
                React.createElement("br", null),
                " Easily customizable."
              )
            )
          )
        );
      }
    }
  });

  return SimpleExample;
})(React.Component);

module.exports = SimpleExample;

},{"react":"react","react-leaflet":"react-leaflet"}],"/Users/paul/dev/PaulLeCam/react-leaflet/example/vector-layers.js":[function(require,module,exports){
"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var React = _interopRequire(require("react"));

var _reactLeaflet = require("react-leaflet");

var Circle = _reactLeaflet.Circle;
var CircleMarker = _reactLeaflet.CircleMarker;
var Map = _reactLeaflet.Map;
var MultiPolygon = _reactLeaflet.MultiPolygon;
var MultiPolyline = _reactLeaflet.MultiPolyline;
var Polygon = _reactLeaflet.Polygon;
var Polyline = _reactLeaflet.Polyline;
var Popup = _reactLeaflet.Popup;
var Rectangle = _reactLeaflet.Rectangle;
var TileLayer = _reactLeaflet.TileLayer;

var VectorLayersExample = (function (_React$Component) {
  function VectorLayersExample() {
    _classCallCheck(this, VectorLayersExample);

    if (_React$Component != null) {
      _React$Component.apply(this, arguments);
    }
  }

  _inherits(VectorLayersExample, _React$Component);

  _createClass(VectorLayersExample, {
    render: {
      value: function render() {
        var center = [51.505, -0.09];

        var polyline = [[51.505, -0.09], [51.51, -0.1], [51.51, -0.12]];

        var multiPolyline = [[[51.5, -0.1], [51.5, -0.12], [51.52, -0.12]], [[51.5, -0.05], [51.5, -0.06], [51.52, -0.06]]];

        var polygon = [[51.515, -0.09], [51.52, -0.1], [51.52, -0.12]];

        var multiPolygon = [[[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]], [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]]];

        var rectangle = [[51.49, -0.08], [51.5, -0.06]];

        return React.createElement(
          Map,
          { center: center, zoom: 13 },
          React.createElement(TileLayer, {
            url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
            attribution: "© <a href=\"http://osm.org/copyright\">OpenStreetMap</a> contributors"
          }),
          React.createElement(Circle, { center: center, radius: 200, fillColor: "blue" }),
          React.createElement(
            CircleMarker,
            { center: [51.51, -0.12], radius: 20, color: "red" },
            React.createElement(
              Popup,
              null,
              React.createElement(
                "span",
                null,
                "Popup in CircleMarker"
              )
            )
          ),
          React.createElement(Polyline, { positions: polyline, color: "lime" }),
          React.createElement(MultiPolyline, { polylines: multiPolyline, color: "lime" }),
          React.createElement(Polygon, { positions: polygon, color: "purple" }),
          React.createElement(MultiPolygon, { polygons: multiPolygon, color: "purple" }),
          React.createElement(Rectangle, { bounds: rectangle, color: "black" })
        );
      }
    }
  });

  return VectorLayersExample;
})(React.Component);

module.exports = VectorLayersExample;

},{"react":"react","react-leaflet":"react-leaflet"}]},{},["./example/app.js"]);

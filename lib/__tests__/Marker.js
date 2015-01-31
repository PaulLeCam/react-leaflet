"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

jest.dontMock("../Map");
jest.dontMock("../TileLayer");
jest.dontMock("../Marker");
jest.dontMock("../mixins/element");
jest.dontMock("../mixins/mapLayer");

var React = _interopRequire(require("react/addons"));

var Utils = React.addons.TestUtils;

var _ = require("../");

var Map = _.Map;
var Marker = _.Marker;
var TileLayer = _.TileLayer;

describe("Marker", function () {
  it("should add the marker to the map", function () {
    document.body.innerHTML = "<div id=\"test\"></div>";
    var position = [0, 0];
    var mapComponent = React.createElement(
      Map,
      { center: position, zoom: 10 },
      React.createElement(TileLayer, { url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
      React.createElement(Marker, { position: position })
    );
    var mapInstance = React.render(mapComponent, document.getElementById("test"));

    expect(mapInstance.getDOMNode().querySelector(".leaflet-marker-pane img")).toBeDefined();
  });
});
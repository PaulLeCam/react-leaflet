"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

jest.dontMock("../BaseTileLayer");
jest.dontMock("../MapComponent");
jest.dontMock("../MapLayer");
jest.dontMock("../PopupContainer");
jest.dontMock("../Map");
jest.dontMock("../TileLayer");
jest.dontMock("../Marker");
jest.dontMock("../index");

var React = _interopRequire(require("react"));

var _ = require("../");

var Map = _.Map;
var Marker = _.Marker;
var TileLayer = _.TileLayer;

describe("Marker", function () {
  it("adds the marker to the map", function () {
    var position = [0, 0];
    var component = React.createElement(
      Map,
      { center: position, zoom: 10 },
      React.createElement(TileLayer, { url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
      React.createElement(Marker, { position: position })
    );

    document.body.innerHTML = "<div id=\"test\"></div>";
    React.render(component, document.getElementById("test"));

    expect(document.querySelector("#test .leaflet-marker-pane img")).toBeDefined();
  });
});
"use strict";

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { "default": obj }; };

var _React = require("react");

var _React2 = _interopRequireDefault(_React);

jest.dontMock("../BaseTileLayer");
jest.dontMock("../MapComponent");
jest.dontMock("../MapLayer");
jest.dontMock("../PopupContainer");
jest.dontMock("../Map");
jest.dontMock("../TileLayer");
jest.dontMock("../Marker");
jest.dontMock("../index");

var _require = require("../");

var Map = _require.Map;
var Marker = _require.Marker;
var TileLayer = _require.TileLayer;

describe("Marker", function () {
  it("adds the marker to the map", function () {
    var position = [0, 0];
    var component = _React2["default"].createElement(
      Map,
      { center: position, zoom: 10 },
      _React2["default"].createElement(TileLayer, { url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png" }),
      _React2["default"].createElement(Marker, { position: position })
    );

    document.body.innerHTML = "<div id=\"test\"></div>";
    _React2["default"].render(component, document.getElementById("test"));

    expect(document.querySelector("#test .leaflet-marker-pane img")).toBeDefined();
  });
});
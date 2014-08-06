jest.dontMock "../src/Map.coffee"
jest.dontMock "../src/TileLayer.coffee"

describe "TileLayer", ->

  it "should add the tile layer to the map", ->
    react = require "react/addons"
    utils = react.addons.TestUtils

    Map = require "../src/Map.coffee"
    TileLayer = require "../src/TileLayer.coffee"

    document.body.innerHTML = '<div id="test"></div>'
    mapComponent = Map null,
      TileLayer url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    mapInstance = react.renderComponent mapComponent, document.getElementById "test"

    expect mapInstance.getDOMNode().getElementsByClassName('leaflet-tile-pane')[0]
    .toBeDefined()

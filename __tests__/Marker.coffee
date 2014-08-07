jest.dontMock "../src/Map.coffee"
jest.dontMock "../src/TileLayer.coffee"
jest.dontMock "../src/Marker.coffee"

describe "Marker", ->

  it "should add the marker to the map", ->
    react = require "react/addons"
    utils = react.addons.TestUtils

    {Map, Marker, TileLayer} = require "../src"

    document.body.innerHTML = '<div id="test"></div>'
    mapComponent = Map
      center: [0, 0]
      zoom: 10
      TileLayer url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      Marker position: [0, 0]
    mapInstance = react.renderComponent mapComponent, document.getElementById "test"

    expect mapInstance.getDOMNode().querySelector '.leaflet-marker-pane img'
    .not.toBeNull()

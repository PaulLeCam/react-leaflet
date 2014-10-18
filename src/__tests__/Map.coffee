jest.dontMock "../Map.coffee"

describe "Map", ->
  react = null
  Map = null

  beforeEach ->
    react = require "react"
    Map = require "../Map.coffee"

  it "should initialize the map in the rendered container", ->
    document.body.innerHTML = '<div id="test"></div>'
    mapInstance = react.renderComponent Map(), document.getElementById "test"
    mapNode = mapInstance.getDOMNode()

    expect(mapNode._leaflet).toBe on

  it "should set center and zoom props", ->
    center = [1.2, 3.4]
    zoom = 10

    document.body.innerHTML = '<div id="test"></div>'
    mapComponent = Map {center, zoom}
    mapInstance = react.renderComponent mapComponent, document.getElementById "test"
    mapLeaflet = mapInstance.state.map

    expect(mapLeaflet.getCenter().lat).toBe center[0]
    expect(mapLeaflet.getCenter().lng).toBe center[1]
    expect(mapLeaflet.getZoom()).toBe zoom

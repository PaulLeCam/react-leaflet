jest.dontMock "../src/Map.coffee"

describe "Map", ->

  it "should initialize the map in the rendered container", ->
    react = require "react"
    Map = require "../src/Map.coffee"

    document.body.innerHTML = '<div id="test"></div>'
    map = react.renderComponent Map(), document.getElementById "test"
    node = map.getDOMNode()

    expect(node._leaflet).toBe on

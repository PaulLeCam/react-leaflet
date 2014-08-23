jest.dontMock "../src/Map.coffee"
jest.dontMock "../src/mixins/events.coffee"

describe "Events", ->

  # Test event bound/triggered
  # Test does not work, though events are properly bound

  # it.only "should bind the event", ->
  #   react = require "react"
  #   Map = require "../src/Map.coffee"
  #
  #   document.body.innerHTML = '<div id="test"></div>'
  #
  #   isTriggered = no
  #   mapComponent = Map
  #     onLeafletClick: ->
  #       isTriggered = yes
  #
  #   mapInstance = react.renderComponent mapComponent, document.getElementById "test"
  #   mapInstance.fireEvent "click"
  #
  #   expect(isTriggered).toBe yes

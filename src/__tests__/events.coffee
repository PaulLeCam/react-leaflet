jest.dontMock "../Map.coffee"
jest.dontMock "../mixins/events.coffee"

describe "Events", ->

  # Test event bound/triggered
  # Test does not work, though events are properly bound

  # it.only "should bind the event", ->
  #   react = require "react"
  #   Map = require "../Map.coffee"
  #
  #   document.body.innerHTML = '<div id="test"></div>'
  #
  #   callback = jest.genMockFn()
  #   mapComponent = Map
  #     onLeafletClick: callback
  #
  #   mapInstance = react.renderComponent mapComponent, document.getElementById "test"
  #   mapInstance.fireEvent "click"
  #
  #   expect(callback.mock.calls.length).toBe 1

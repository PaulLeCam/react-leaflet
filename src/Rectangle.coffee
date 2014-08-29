react = require "react/addons"
leaflet = require "leaflet"

latlngListType = require "./types/latlngList"
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "Rectangle"

  mixins: [eventsMixins "rectangle"]

  propTypes:
    bounds: latlngListType.isRequired

  getInitialState: ->
    rectangle: leaflet.rectangle @props.bounds, @props

  render: ->
    @state.rectangle.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

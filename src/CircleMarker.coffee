react = require "react/addons"
leaflet = require "leaflet"

latlngType = require "./types/latlng"
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "CircleMarker"

  mixins: [eventsMixins "circleMarker"]

  propTypes:
    center: latlngType.isRequired

  getInitialState: ->
    circleMarker: leaflet.circleMarker @props.center, @props

  render: ->
    @state.circleMarker.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

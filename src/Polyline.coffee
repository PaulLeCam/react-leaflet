react = require "react/addons"
leaflet = require "leaflet"

latlngListType = require "./types/latlngList"
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "Polyline"

  mixins: [eventsMixins "polyline"]

  propTypes:
    positions: latlngListType.isRequired

  getInitialState: ->
    polyline: leaflet.polyline @props.positions, @props

  render: ->
    @state.polyline.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

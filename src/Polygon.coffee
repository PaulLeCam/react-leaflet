react = require "react/addons"
leaflet = require "leaflet"

latlngListType = require "./types/latlngList"
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "Polygon"

  mixins: [eventsMixins "polygon"]

  propTypes:
    positions: latlngListType.isRequired

  getInitialState: ->
    polygon: leaflet.polygon @props.positions, @props

  render: ->
    @state.polygon.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "CanvasTileLayer"

  mixins: [eventsMixins "tileLayer"]

  getInitialState: ->
    tileLayer: leaflet.tileLayer.canvas @props

  render: ->
    @state.tileLayer.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @state.tileLayer

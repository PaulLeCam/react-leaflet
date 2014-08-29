react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "LayerGroup"

  mixins: [eventsMixins "layerGroup"]

  propTypes:
    layers: Type.array.isRequired

  getInitialState: ->
    layerGroup: leaflet.layerGroup @props.layers

  render: ->
    @state.layerGroup.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

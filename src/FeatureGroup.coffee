react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "FeatureGroup"

  mixins: [eventsMixins "featureGroup"]

  propTypes:
    layers: Type.array.isRequired

  getInitialState: ->
    featureGroup: leaflet.featureGroup @props.layers

  render: ->
    @state.featureGroup.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

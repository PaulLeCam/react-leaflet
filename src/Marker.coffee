react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
latlngType = require "./types/latlng"

eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "Marker"

  mixins: [eventsMixins "marker"]

  propTypes:
    position: latlngType.isRequired

  getInitialState: ->
    marker: leaflet.marker @props.position, @props

  render: ->
    @state.marker.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer
        marker: @state.marker

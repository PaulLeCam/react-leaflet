react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
latlngType = require "./types/latlng"

eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "Circle"

  mixins: [eventsMixins "circle"]

  propTypes:
    center: latlngType.isRequired
    radius: Type.number.isRequired

  getInitialState: ->
    circle: leaflet.circle @props.center, @props.radius, @props

  render: ->
    @state.circle.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

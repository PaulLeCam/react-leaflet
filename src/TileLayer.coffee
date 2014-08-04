react = require "react"
leaflet = require "leaflet"

Type = react.PropTypes

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "TileLayer"

  propTypes:
    url: Type.string.isRequired

  getInitialState: ->
    tileLayer: leaflet.tileLayer @props.url, @props

  render: ->
    @state.tileLayer.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @state.tileLayer

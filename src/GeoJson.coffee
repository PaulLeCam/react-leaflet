react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "GeoJson"

  mixins: [eventsMixins "geoJson"]

  propTypes:
    data: Type.object.isRequired

  getInitialState: ->
    geoJson: leaflet.geoJson @props.data, @props

  render: ->
    @state.geoJson.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer

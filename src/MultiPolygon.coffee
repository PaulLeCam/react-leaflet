react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
latlngListType = require "./types/latlngList"

eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "MultiPolygon"

  mixins: [eventsMixins "multiPolygon"]

  propTypes:
    polygons: Type.arrayOf(latlngListType).isRequired

  getInitialState: ->
    multiPolygon: leaflet.multiPolyline @props.polygons, @props

  render: ->
    @state.multiPolygon.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer
        multiPolygon: @state.multiPolygon

react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
latlngListType = require "./types/latlngList"

eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "MultiPolyline"

  mixins: [eventsMixins "multiPolyline"]

  propTypes:
    polylines: Type.arrayOf(latlngListType).isRequired

  getInitialState: ->
    multiPolyline: leaflet.multiPolyline @props.polylines, @props

  render: ->
    @state.multiPolyline.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map
        layer: @props.layer
        multiPolyline: @state.multiPolyline

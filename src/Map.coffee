react = require "react/addons"
leaflet = require "leaflet"
uniqueId = require "lodash-node/modern/utilities/uniqueId"

Type = react.PropTypes
latlngType = require "./types/latlng"
latlngBoundsType = require "./types/latlngBounds"

{div} = react.DOM

Map = react.createClass
  displayName: "Map"

  statics:
    uid: ->
      uniqueId "map"

  propTypes:
    center: latlngType
    zoom: Type.number
    minZoom: Type.number
    maxZoom: Type.number
    maxBounds: latlngBoundsType

  getInitialState: ->
    id: Map.uid()

  componentDidMount: ->
    map = leaflet.map @state.id, @props
    @setState {map}

  render: ->
    div id: @state.id, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child, map: @state.map

module.exports = Map

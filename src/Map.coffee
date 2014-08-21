react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
latlngType = require "./types/latlng"
latlngBoundsType = require "./types/latlngBounds"

eventsMixins = require "./mixins/events"

{div} = react.DOM
currentId = 0

Map = react.createClass
  displayName: "Map"

  mixins: [eventsMixins "map"]

  statics:
    uid: -> "map#{ ++currentId }"

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

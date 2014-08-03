react = require "react"
leaflet = require "leaflet"

Type = react.PropTypes
latlngType = require "./types/latlng"

module.exports = react.createClass
  displayName: "Marker"

  propTypes:
    position: latlngType.isRequired

  getInitialState: ->
    marker: leaflet.marker @props.position, @props

  render: ->
    @state.marker.addTo @props.map if @props.map
    null

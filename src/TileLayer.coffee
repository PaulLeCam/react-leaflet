react = require "react"
leaflet = require "leaflet"

Type = react.PropTypes

module.exports = react.createClass
  displayName: "TileLayer"

  propTypes:
    url: Type.string.isRequired

  getInitialState: ->
    tile: leaflet.tileLayer @props.url, @props

  render: ->
    @state.tile.addTo @props.map if @props.map
    null

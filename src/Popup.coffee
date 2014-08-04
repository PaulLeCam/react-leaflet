react = require "react"
leaflet = require "leaflet"

module.exports = react.createClass
  displayName: "Popup"

  getInitialState: ->
    popup: leaflet.popup @props, @props.layer

  render: ->
    if @props.children
      content = react.renderComponentToString @props.children
      # Attach to a Marker
      if @props.marker then @props.marker.bindPopup content
      # Attach to a Map
      else
        @state.popup.setContent content
        @state.popup.setLatLng @props.position if @props.position
        @state.popup.openOn @props.map if @props.map
    null

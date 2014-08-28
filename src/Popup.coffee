react = require "react"
leaflet = require "leaflet"

eventsMixins = require "./mixins/events"

bindTo = [
  "marker"
  "multiPolyline"
  "multiPolygon"
]

module.exports = react.createClass
  displayName: "Popup"

  mixins: [eventsMixins "popup"]

  getInitialState: ->
    popup: leaflet.popup @props, @props.layer

  render: ->
    if @props.children
      content = react.renderComponentToString @props.children
      # Attach to parent component
      for component in bindTo when el = @props[ component ]
        el.bindPopup content
        return null
      # Attach to a Map
      @state.popup.setContent content
      @state.popup.setLatLng @props.position if @props.position
      @state.popup.openOn @props.map if @props.map
    null

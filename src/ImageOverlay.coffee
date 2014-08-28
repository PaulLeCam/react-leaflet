react = require "react/addons"
leaflet = require "leaflet"

Type = react.PropTypes
latlngListType = require "./types/latlngList"

eventsMixins = require "./mixins/events"

{noscript} = react.DOM

module.exports = react.createClass
  displayName: "ImageOverlay"

  mixins: [eventsMixins "imageOverlay"]

  propTypes:
    url: Type.string.isRequired
    bounds: latlngListType.isRequired

  getInitialState: ->
    imageOverlay: leaflet.imageOverlay @props.url, @props.bounds, @props

  render: ->
    @state.imageOverlay.addTo @props.map if @props.map
    noscript null, react.Children.map @props.children, (child) =>
      react.addons.cloneWithProps child,
        map: @props.map

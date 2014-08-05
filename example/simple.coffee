react = require "react"
{p, strong, em} = react.DOM
{Map, TileLayer, Marker, Popup} = require "react-leaflet"

SimpleExample = react.createClass
  displayName: "SimpleExample"
  render: ->
    Map
      center: [51.505, -0.09]
      zoom: 13
      TileLayer
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      Marker
        position: [51.505, -0.09]
        Popup null,
          p null,
            strong null, "Hello"
            em null, " World"

react.renderComponent SimpleExample(), document.getElementById "content"

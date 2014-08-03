react = require "react"
L = require "../src"

SimpleExample = react.createClass
  displayName: "SimpleExample"
  render: ->
    L.Map
      center: [51.505, -0.09]
      zoom: 13
      L.TileLayer
        url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png"
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      L.Marker
        position: [51.505, -0.09]

react.renderComponent SimpleExample(), document.getElementById "content"

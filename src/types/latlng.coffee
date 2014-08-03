react = require "react"
Type = react.PropTypes

module.exports = Type.oneOfType [
  # [Number, Number]
  Type.arrayOf Type.number
  # {lat: Number, lng: Number}
  Type.shape
    lat: Type.number
    lng: Type.number
  # {lat: Number, lon: Number}
  Type.shape
    lat: Type.number
    lon: Type.number
]

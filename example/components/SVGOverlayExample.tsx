import { LatLngTuple } from 'leaflet'
import React from 'react'

import { Map, TileLayer, SVGOverlay } from '../../src'

const position: LatLngTuple = [51.505, -0.09]
const bounds: LatLngTuple[] = [
  [51.49, -0.08],
  [51.5, -0.06],
]

export default function SVGOverlayExample() {
  return (
    <Map center={position} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <SVGOverlay bounds={bounds}>
        <rect x="0" y="0" width="100%" height="100%" fill="blue" />
        <circle r="5" cx="10" cy="10" fill="red" />
        <text x="50%" y="50%" fill="white">
          text
        </text>
      </SVGOverlay>
    </Map>
  )
}

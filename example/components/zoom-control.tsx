import { LatLngTuple } from 'leaflet'
import React from 'react'

import { Map, TileLayer, ZoomControl } from '../../src'

const center: LatLngTuple = [51.505, -0.09]

export default function ZoomControlExample() {
  return (
    <Map center={center} zoom={13} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
    </Map>
  )
}

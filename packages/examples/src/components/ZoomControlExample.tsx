import { LatLngTuple } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet'

const center: LatLngTuple = [51.505, -0.09]

export default function ZoomControlExample() {
  return (
    <MapContainer center={center} zoom={13} zoomControl={false}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="topright" />
    </MapContainer>
  )
}

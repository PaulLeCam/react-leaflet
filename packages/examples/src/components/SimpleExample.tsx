import { LatLngTuple } from 'leaflet'
import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const position: LatLngTuple = [51.505, -0.09]

export default function SimpleExample() {
  return (
    <MapContainer center={position} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  )
}

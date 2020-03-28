import { LatLngTuple } from 'leaflet'
import React, { useState } from 'react'
import {
  MapContainer,
  TileLayer,
  VideoOverlay,
  useMapEvent,
} from 'react-leaflet'

const center: LatLngTuple = [25, -100]

function PlayVideo() {
  const [play, setPlay] = useState(true)
  useMapEvent('click', () => {
    setPlay((p) => !p)
  })

  return (
    <VideoOverlay
      bounds={[
        [32, -130],
        [13, -100],
      ]}
      play={play}
      url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
    />
  )
}

export default function VideoOverlayExample() {
  return (
    <MapContainer center={center} zoom={4}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <PlayVideo />
    </MapContainer>
  )
}

import { LatLngTuple } from 'leaflet'
import React, { useMemo, useState } from 'react'

import { Map, TileLayer, VideoOverlay } from '../../src'

const center: LatLngTuple = [25, -100]

export default function VideoOverlayExample() {
  const [play, setPlay] = useState(true)
  const eventHandlers = useMemo(
    () => ({
      click() {
        setPlay((p) => !p)
      },
    }),
    [],
  )

  return (
    <Map center={center} eventHandlers={eventHandlers} zoom={4}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <VideoOverlay
        bounds={[
          [32, -130],
          [13, -100],
        ]}
        play={play}
        url="https://www.mapbox.com/bites/00188/patricia_nasa.webm"
      />
    </Map>
  )
}

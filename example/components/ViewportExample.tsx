import { LatLngTuple } from 'leaflet'
import React, { useMemo, useState } from 'react'

import { Map, TileLayer } from '../../src'

interface Viewport {
  center: LatLngTuple
  zoom: number
}

function createViewport(): Viewport {
  return {
    center: [51.505, -0.09],
    zoom: 13,
  }
}

export default function ViewportExample() {
  const [viewport, setViewport] = useState<Viewport>(createViewport())
  const eventHandlers = useMemo(
    () => ({
      click: () => {
        setViewport(createViewport())
      },
    }),
    [],
  )

  return (
    <Map
      center={viewport.center}
      zoom={viewport.zoom}
      eventHandlers={eventHandlers}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </Map>
  )
}

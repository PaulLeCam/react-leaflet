import { LatLngTuple } from 'leaflet'
import React, { useMemo, useState } from 'react'

import { Map, TileLayer, Rectangle } from '../../src'

const innerBounds: LatLngTuple[] = [[49.505, -2.09], [53.505, 2.09]]
const outerBounds: LatLngTuple[] = [[50.505, -29.09], [52.505, 29.09]]

const redColor = { color: 'red' }
const whiteColor = { color: 'white' }

export default function BoundsExample() {
  const [bounds, setBounds] = useState(outerBounds)
  const innerHandlers = useMemo(
    () => ({
      click() {
        setBounds(innerBounds)
      },
    }),
    [],
  )
  const outerHandlers = useMemo(
    () => ({
      click() {
        setBounds(outerBounds)
      },
    }),
    [],
  )

  return (
    <Map bounds={bounds}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Rectangle
        bounds={outerBounds}
        eventHandlers={outerHandlers}
        pathOptions={bounds === outerBounds ? redColor : whiteColor}
      />
      <Rectangle
        bounds={innerBounds}
        eventHandlers={innerHandlers}
        pathOptions={bounds === innerBounds ? redColor : whiteColor}
      />
    </Map>
  )
}

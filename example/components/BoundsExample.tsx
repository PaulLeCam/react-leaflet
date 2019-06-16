import { LatLngTuple } from 'leaflet'
import React, { useCallback, useMemo, useState } from 'react'

import { Map, TileLayer, Rectangle } from '../../src'

const inner: LatLngTuple[] = [[49.505, -2.09], [53.505, 2.09]]
const outer: LatLngTuple[] = [[50.505, -29.09], [52.505, 29.09]]

export default function BoundsExample() {
  const [bounds, setBounds] = useState(outer)

  const onClickInner = useCallback(() => {
    setBounds(inner)
  }, [])

  const onClickOuter = useCallback(() => {
    setBounds(outer)
  }, [])

  const tileLayer = useMemo(
    () => (
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    ),
    [],
  )

  return (
    <Map bounds={bounds}>
      {tileLayer}
      <Rectangle
        bounds={outer}
        color={bounds === outer ? 'red' : 'white'}
        onClick={onClickOuter}
      />
      <Rectangle
        bounds={inner}
        color={bounds === inner ? 'red' : 'white'}
        onClick={onClickInner}
      />
    </Map>
  )
}

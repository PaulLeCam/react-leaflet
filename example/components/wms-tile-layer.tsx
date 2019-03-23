import { LatLngTuple } from 'leaflet'
import React, { useCallback, useState } from 'react'

import { Map, TileLayer, WMSTileLayer } from '../../src'

const center: LatLngTuple = [51.505, -0.09]

export default function WMSTileLayerExample() {
  const [blueMarble, setBlueMarble] = useState(false)

  const onClick = useCallback(() => {
    setBlueMarble(b => !b)
  }, [])

  return (
    <Map center={center} zoom={5} onClick={onClick}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <WMSTileLayer
        layers={blueMarble ? 'nasa:bluemarble' : 'ne:ne'}
        url="https://demo.boundlessgeo.com/geoserver/ows"
      />
    </Map>
  )
}

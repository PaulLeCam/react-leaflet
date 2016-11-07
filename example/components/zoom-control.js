import React from 'react'
import { Map, TileLayer, ZoomControl } from '../../src'

const ZoomControlExample = () => (
  <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
    <TileLayer
      attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
    />
    <ZoomControl position='topright' />
  </Map>
)

export default ZoomControlExample

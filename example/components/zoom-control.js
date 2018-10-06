// @flow

import React from 'react'
import { Map, TileLayer, ZoomControl } from '../../src'

const ZoomControlExample = () => (
  <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
    <TileLayer
      attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <ZoomControl position="topright" />
  </Map>
)

export default ZoomControlExample

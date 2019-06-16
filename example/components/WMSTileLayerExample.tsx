import { LatLngTuple } from 'leaflet'
import React from 'react'

import { Map, TileLayer, WMSTileLayer } from '../../src'

const center: LatLngTuple = [40, -90]

export default function WMSTileLayerExample() {
  return (
    <Map center={center} zoom={4}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <WMSTileLayer
        attribution="Weather data © 2012 IEM Nexrad"
        layers="nexrad-n0r-900913"
        format="image/png"
        transparent
        url="http://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi"
      />
    </Map>
  )
}

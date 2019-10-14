import { Feature, Geometry } from 'geojson'
import { LatLngTuple, Layer } from 'leaflet'
import React from 'react'

import { Map, TileLayer, GeoJSON } from '../../src'
import london from '../assets/london.json'

const position: LatLngTuple = [51.505, -0.09]
const style = {
  color: '#1f2021',
  weight: 1,
  fillOpacity: 0.5,
  fillColor: '#fff2af',
}
function onEachFeature(feature: Feature<Geometry>, layer: Layer) {
  layer.bindPopup(
    `<p>Customizable Popups <br />with feature information.</p><pre>Borough: <br />${feature.properties.name}</pre>`,
  )
}

export default function GeoJSONExample() {
  return (
    <Map center={position} zoom={12}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON data={london} style={style} onEachFeature={onEachFeature} />
    </Map>
  )
}

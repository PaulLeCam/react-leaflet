import { LatLngTuple } from 'leaflet'
import React from 'react'
import {
  Circle,
  CircleMarker,
  MapContainer,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'

const center: LatLngTuple = [51.505, -0.09]

const polyline: LatLngTuple[] = [
  [51.505, -0.09],
  [51.51, -0.1],
  [51.51, -0.12],
]

const multiPolyline: LatLngTuple[][] = [
  [
    [51.5, -0.1],
    [51.5, -0.12],
    [51.52, -0.12],
  ],
  [
    [51.5, -0.05],
    [51.5, -0.06],
    [51.52, -0.06],
  ],
]

const polygon: LatLngTuple[] = [
  [51.515, -0.09],
  [51.52, -0.1],
  [51.52, -0.12],
]

const multiPolygon: LatLngTuple[][] = [
  [
    [51.51, -0.12],
    [51.51, -0.13],
    [51.53, -0.13],
  ],
  [
    [51.51, -0.05],
    [51.51, -0.07],
    [51.53, -0.07],
  ],
]

const rectangle: LatLngTuple[] = [
  [51.49, -0.08],
  [51.5, -0.06],
]

export default function VectorLayersExample() {
  return (
    <MapContainer center={center} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Circle
        center={center}
        pathOptions={{ fillColor: 'blue' }}
        radius={200}
      />
      <CircleMarker
        center={[51.51, -0.12]}
        pathOptions={{ color: 'red' }}
        radius={20}>
        <Popup>Popup in CircleMarker</Popup>
      </CircleMarker>
      <Polyline pathOptions={{ color: 'lime' }} positions={polyline} />
      <Polyline pathOptions={{ color: 'lime' }} positions={multiPolyline} />
      <Polygon pathOptions={{ color: 'purple' }} positions={polygon} />
      <Polygon pathOptions={{ color: 'purple' }} positions={multiPolygon} />
      <Rectangle bounds={rectangle} pathOptions={{ color: 'black' }} />
    </MapContainer>
  )
}

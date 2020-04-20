import { LatLngTuple } from 'leaflet'
import React from 'react'
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  MapContainer,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet'

const center: LatLngTuple = [51.505, -0.09]
const rectangle: LatLngTuple[] = [
  [51.49, -0.08],
  [51.5, -0.06],
]

export default function OtherLayersExample() {
  return (
    <MapContainer center={center} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LayerGroup>
        <Circle
          center={center}
          pathOptions={{ fillColor: 'blue' }}
          radius={200}
        />
        <Circle
          center={center}
          pathOptions={{ fillColor: 'red' }}
          radius={100}
          stroke={false}
        />
        <LayerGroup>
          <Circle
            center={[51.51, -0.08]}
            pathOptions={{ color: 'green', fillColor: 'green' }}
            radius={100}
          />
        </LayerGroup>
      </LayerGroup>
      <FeatureGroup pathOptions={{ color: 'purple' }}>
        <Popup>Popup in FeatureGroup</Popup>
        <Circle center={[51.51, -0.06]} radius={200} />
        <Rectangle bounds={rectangle} />
      </FeatureGroup>
    </MapContainer>
  )
}

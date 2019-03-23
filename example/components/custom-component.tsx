import { LatLngTuple } from 'leaflet'
import React, { useState } from 'react'

import { Map, TileLayer, Marker, Popup } from '../../src'

interface MyPopupMarkerProps {
  content: string
  position: LatLngTuple
}

interface MyPopupMarkerData extends MyPopupMarkerProps {
  key: string
}

function MyPopupMarker({ content, position }: MyPopupMarkerProps) {
  return (
    <Marker position={position}>
      <Popup>{content}</Popup>
    </Marker>
  )
}

interface MyMarkersListProps {
  markers: MyPopupMarkerData[]
}

function MyMarkersList({ markers }: MyMarkersListProps) {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <>{items}</>
}

export default function CustomComponent() {
  const [markers] = useState<MyPopupMarkerData[]>([
    { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
    { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
    { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
  ])

  return (
    <Map center={[51.505, -0.09]} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyMarkersList markers={markers} />
    </Map>
  )
}

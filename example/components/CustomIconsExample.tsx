import { Icon, LatLngTuple } from 'leaflet'
import React from 'react'

import { Map, Marker, Popup, TileLayer } from '../../src'

const center: LatLngTuple = [51.505, -0.09]
const marker: LatLngTuple = [51.50503625326346, -0.10088324546813966]

export const pointerIcon = new Icon({
  iconUrl: '../assets/pointerIcon.svg',
  iconRetinaUrl: '../assets/pointerIcon.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

export const suitcasePoint = new Icon({
  iconUrl: '../assets/suitcaseIcon.svg',
  iconRetinaUrl: '../assets/suitcaseIcon.svg',
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

export default function CustomIcons() {
  return (
    <Map center={center} zoom={13}>
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={center} icon={pointerIcon}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <Marker position={marker} icon={suitcasePoint}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </Map>
  )
}

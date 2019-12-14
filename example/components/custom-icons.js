// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from '../../src'
import L from 'leaflet'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export const pointerIcon = new L.Icon({
  iconUrl: '../assets/pointerIcon.svg',
  iconRetinaUrl: '../assets/pointerIcon.svg',
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

export const suitcasePoint = new L.Icon({
  iconUrl: '../assets/suitcaseIcon.svg',
  iconRetinaUrl: '../assets/suitcaseIcon.svg',
  iconAnchor: [20, 40],
  popupAnchor: [0, -35],
  iconSize: [40, 40],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [29, 40],
  shadowAnchor: [7, 40],
})

export default class CustomIcons extends Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    const position2 = [51.50503625326346, -0.10088324546813966]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pointerIcon}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
        <Marker position={position2} icon={suitcasePoint}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

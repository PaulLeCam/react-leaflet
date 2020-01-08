// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from '../../src'

type State = {
  lat: number,
  lng: number,
  zoom: number,
};

export default class SimpleExample extends Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }; // I propose this because when en do "react start", i have an error render()^{}

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
  }
}

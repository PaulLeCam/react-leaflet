// @flow

import React, { Component } from 'react'
import { Map, TileLayer, WMSTileLayer } from '../../src'

type State = {
  lat: number,
  lng: number,
  zoom: number,
  bluemarble: boolean,
}

export default class WMSTileLayerExample extends Component<{}, State> {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 5,
    bluemarble: false,
  }

  onClick = () => {
    this.setState({
      bluemarble: !this.state.bluemarble,
    })
  }

  render() {
    return (
      <Map
        center={[this.state.lat, this.state.lng]}
        zoom={this.state.zoom}
        onClick={this.onClick}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <WMSTileLayer
          layers={this.state.bluemarble ? 'nasa:bluemarble' : 'ne:ne'}
          url="https://demo.boundlessgeo.com/geoserver/ows"
        />
      </Map>
    )
  }
}

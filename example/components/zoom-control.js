import React, { Component } from 'react';
import { Map, TileLayer, ZoomControl } from '../../src';

export default class ZoomControlExample extends Component {
  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <ZoomControl position='topright' />
      </Map>
    );
  }
}

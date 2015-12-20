import React, { Component } from 'react';
import { Map, TileLayer, EditControl, Circle, FeatureGroup } from '../../src';

export default class EditControlExample extends Component {

  _onEditPath(e) {
    console.log("Path edited !");
  }

  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13} zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <FeatureGroup>
            <EditControl position='topright' onEdit={this._onEditPath} />
            <Circle center={[51.51, -0.06]} radius={200} />
        </FeatureGroup>
      </Map>
    );
  }
}

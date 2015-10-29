import React, { Component } from 'react';
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  Map,
  Popup,
  Rectangle,
  TileLayer,
} from 'react-leaflet';

export default class OtherLayersExample extends Component {
  render() {
    const center = [51.505, -0.09];

    const rectangle = [
      [51.49, -0.08],
      [51.5, -0.06],
    ];

    return (
      <Map center={center} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <LayerGroup>
          <Circle center={center} fillColor='blue' radius={200} />
          <Circle center={center} fillColor='red' radius={100} stroke={false} />
          <LayerGroup>
            <Circle center={[51.51, -0.08]} color='green' fillColor='green' radius={100} />
          </LayerGroup>
        </LayerGroup>
        <FeatureGroup color='purple'>
          <Popup>
            <span>Popup in FeatureGroup</span>
          </Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
      </Map>
    );
  }
}

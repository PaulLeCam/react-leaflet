import React, { Component } from 'react';
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  LayersControl,
  Map,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
} from '../../src';
const { BaseLayer, Overlay } = LayersControl;

export default class LayersControlExample extends Component {
  render() {
    const center = [51.505, -0.09];
    const rectangle = [
      [51.49, -0.08],
      [51.5, -0.06],
    ];

    return (
      <Map center={center} zoom={13}>
        <LayersControl position='topright'>
          <BaseLayer checked name='OpenStreetMap.Mapnik'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
          </BaseLayer>
          <BaseLayer name='OpenStreetMap.BlackAndWhite'>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url='http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png'
            />
          </BaseLayer>
          <Overlay name='Marker with popup'>
            <Marker position={center}>
              <Popup>
                <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
              </Popup>
            </Marker>
          </Overlay>
          <Overlay checked name='Layer group with circles'>
            <LayerGroup>
              <Circle center={center} fillColor='blue' radius={200} />
              <Circle center={center} fillColor='red' radius={100} stroke={false} />
              <LayerGroup>
                <Circle center={[51.51, -0.08]} color='green' fillColor='green' radius={100} />
              </LayerGroup>
            </LayerGroup>
          </Overlay>
          <Overlay name='Feature group'>
            <FeatureGroup color='purple'>
              <Popup>
                <span>Popup in FeatureGroup</span>
              </Popup>
              <Circle center={[51.51, -0.06]} radius={200} />
              <Rectangle bounds={rectangle} />
            </FeatureGroup>
          </Overlay>
        </LayersControl>
      </Map>
    );
  }
}

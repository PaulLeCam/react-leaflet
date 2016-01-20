import React, { Component } from 'react';
import {
  Circle,
  FeatureGroup,
  LayerGroup,
  Map,
  Popup,
  Rectangle,
  TileLayer,
} from '../../src';

export default class OtherLayersExample extends Component {
  constructor(){
    super();
    this.state = {
      circleClicks: 0,
    };
  }

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
        <Circle
          center={[51.51, -0.06]}
          onpopupopen={() => {
            this.setState({circleClicks: this.state.circleClicks + 1})}
          }
          radius={400}
        >
          <Popup>
            <span>{`Popup in Circle, clicks: ${this.state.circleClicks}`}</span>
          </Popup>
        </Circle>
        <LayerGroup>
          <Circle center={center} fillColor='blue' radius={200} />
          <Circle center={center} fillColor='red' radius={100} stroke={false} />
          <LayerGroup>
            <Circle center={[51.51, -0.08]} color='green' fillColor='green' radius={100} />
          </LayerGroup>
        </LayerGroup>
        <FeatureGroup color='purple' >
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

import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from '../../src';

const MyPopupMarker = ({ layerContainer, map, position, children }) => (
  <Marker layerContainer={layerContainer} map={map} position={position}>
    <Popup>
      <span>{children}</span>
    </Popup>
  </Marker>
);

const MyMarkersList = ({ layerContainer, map, markers }) => {
  const items = markers.map(({ key, ...props }) => (
      <MyPopupMarker key={key} layerContainer={layerContainer} map={map} {...props} />
  ));
  return <div style={{display: 'none'}}>{items}</div>;
};

export default class CustomComponent extends Component {
  constructor() {
    super();
    this.state = {
      lat: 51.505,
      lng: -0.09,
      zoom: 13,
    };
  }

  render() {
    const center = [this.state.lat, this.state.lng];

    const markers = [
      {key: 'marker1', position: [51.5, -0.1], children: 'My first popup'},
      {key: 'marker2', position: [51.51, -0.1], children: 'My second popup'},
      {key: 'marker3', position: [51.49, -0.05], children: 'My third popup'},
    ];
    return (
      <Map center={center} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <MyMarkersList markers={markers} />
      </Map>
    );
  }
}

import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class EventsExample extends Component {
  constructor() {
    super();
    this.state = {
      hasLocation: false,
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
    };
  }

  handleClick() {
    this.refs.map.leafletElement.locate();
  }

  handleLocationFound(e) {
    this.setState({
      hasLocation: true,
      latlng: e.latlng,
    });
  }

  render() {
    const marker = this.state.hasLocation
      ? <Marker position={this.state.latlng}>
          <Popup>
            <span>You are here</span>
          </Popup>
        </Marker>
      : null;

    return (
      <Map
        center={this.state.latlng}
        length={4}
        onClick={::this.handleClick}
        onLocationfound={::this.handleLocationFound}
        ref='map'
        zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {marker}
      </Map>
    );
  }
}

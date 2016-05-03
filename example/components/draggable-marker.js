import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from '../../src';

export default class DraggableExample extends Component {
  constructor() {
    super();

    this.state = {
      center: {
        lat: 51.505,
        lng: -0.09,
      },
      marker: {
        lat: 51.505,
        lng: -0.09,
      },
      zoom: 13,
      draggable: true,
    };

    this.toggleDraggable = () => {
      this.setState({draggable: !this.state.draggable});
    };

    this.updatePosition = () => {
      const { lat, lng } = this.refs.marker.getLeafletElement().getLatLng();
      this.setState({
        marker: {lat, lng},
      });
    };
  }

  render() {
    const position = [this.state.center.lat, this.state.center.lng];
    const markerPosition = [this.state.marker.lat, this.state.marker.lng];

    return (
      <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Marker
          draggable={this.state.draggable}
          onDragend={this.updatePosition}
          position={markerPosition}
          ref='marker'>
          <Popup minWidth={90}>
            <span onClick={this.toggleDraggable}>
              {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
            </span>
          </Popup>
        </Marker>
      </Map>
    );
  }
}

import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from '../../src';

export default class AnimateExample extends Component {
  constructor() {
    super();
    this.state = {
      animate: false,
      latlng: {
        lat: 51.505,
        lng: -0.09,
      },
    };
  }

  handleClick(e) {
    this.setState({
      latlng: e.latlng,
    });
  }

  toggleAnimate() {
    this.setState({
      animate: !this.state.animate,
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
      <div style={{textAlign: 'center'}}>
        <label>
          <input checked={this.state.animate} onChange={::this.toggleAnimate} type='checkbox' />
          Animate panning
        </label>
        <Map
          animate={this.state.animate}
          center={this.state.latlng}
          length={4}
          onClick={::this.handleClick}
          ref='map'
          zoom={13}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          />
          {marker}
        </Map>
      </div>
    );
  }
}

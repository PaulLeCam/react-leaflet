import React, { Component } from 'react';
import { Map, TileLayer, Rectangle } from 'react-leaflet';

const outer = [
  [50.505, -29.09],
  [52.505, 29.09],
];
const inner = [
  [49.505, -2.09],
  [53.505, 2.09],
];

export default class BoundsExample extends Component {
  constructor() {
    super();
    this.state = {
      bounds: outer,
    };
  }

  handleClick() {
    if (this.state.bounds === outer) {
      this.setState({bounds: inner});
    } else {
      this.setState({bounds: outer});
    }
  }

  render() {
    return (
      <Map bounds={this.state.bounds}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Rectangle
          bounds={outer}
          color={this.state.bounds === outer ? 'red' : 'white'}
          onClick={() => this.setState({bounds: outer})}
        />
        <Rectangle
          bounds={inner}
          color={this.state.bounds === inner ? 'red' : 'white'}
          onClick={() => this.setState({bounds: inner})}
        />
      </Map>
    );
  }
}

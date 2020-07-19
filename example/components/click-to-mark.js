// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from '../../src'

type State = {
  lat: number,
  lng: number,
  zoom: number,
}

export default class ClickToMarkExample extends Component<{}, State> {
  state = {
    markers: [],
    center: [51.505,-0.09],
    zoom: 13,
  }

  handleClick = (evt) => {
    this.setState({markers:[...this.state.markers,evt.latlng]});
  }

  render() {
    return (
      <Map center={this.state.center} zoom={this.state.zoom} onClick={this.handleClick}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {this.state.markers.map((currentMarker,index) => <Marker key={"marker"+index} position={[currentMarker.lat,currentMarker.lng]}>
          <Popup>
            {`Marker in lat:${currentMarker.lat} - lng:${currentMarker.lng}` }
          </Popup>
        </Marker>)}
        
      </Map>
    )
  }
}

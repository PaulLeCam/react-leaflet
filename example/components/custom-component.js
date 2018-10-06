// @flow

import React, { Component, Fragment } from 'react'
import { Map, TileLayer, Marker, Popup } from '../../src'

type Position = [number, number]

type Props = {|
  content: string,
  position: Position,
|}

type MarkerData = {| ...Props, key: string |}

const MyPopupMarker = ({ content, position }: Props) => (
  <Marker position={position}>
    <Popup>{content}</Popup>
  </Marker>
)

const MyMarkersList = ({ markers }: { markers: Array<MarkerData> }) => {
  const items = markers.map(({ key, ...props }) => (
    <MyPopupMarker key={key} {...props} />
  ))
  return <Fragment>{items}</Fragment>
}

type State = {
  markers: Array<MarkerData>,
}

export default class CustomComponent extends Component<{}, State> {
  state = {
    markers: [
      { key: 'marker1', position: [51.5, -0.1], content: 'My first popup' },
      { key: 'marker2', position: [51.51, -0.1], content: 'My second popup' },
      { key: 'marker3', position: [51.49, -0.05], content: 'My third popup' },
    ],
  }

  render() {
    return (
      <Map center={[51.505, -0.09]} zoom={13}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyMarkersList markers={this.state.markers} />
      </Map>
    )
  }
}

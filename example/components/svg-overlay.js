// @flow

import React, { Component } from 'react'

import { Map, SVGOverlay, TileLayer } from '../../src'

const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]

export default class SVGOverlayExample extends Component<{}> {
  render() {
    return (
      <Map center={center} zoom={13}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <SVGOverlay bounds={rectangle}>
          <rect x="0" y="0" width="100%" height="100%" fill="blue" />
          <circle r="5" cx="10" cy="10" fill="red" />
          <text x="50%" y="50%" fill="white">
            text
          </text>
        </SVGOverlay>
      </Map>
    )
  }
}

import React, { Component } from 'react'
import {
  Circle,
  CircleMarker,
  Map,
  Polygon,
  Rectangle,
  TileLayer,
  Tooltip,
} from '../../src'

export default class TooltipExample extends Component {
  state = {
    clicked: 0,
  }

  onClickCircle = () => {
    this.setState({clicked: this.state.clicked + 1})
  }

  render () {
    const center = [51.505, -0.09]

    const multiPolygon = [
      [[51.51, -0.12], [51.51, -0.13], [51.53, -0.13]],
      [[51.51, -0.05], [51.51, -0.07], [51.53, -0.07]],
    ]

    const rectangle = [
      [51.49, -0.08],
      [51.5, -0.06],
    ]

    const clickedText = this.state.clicked === 0
      ? 'Click this Circle to change the Tooltip text'
      : `Circle click: ${this.state.clicked}`

    return (
      <Map center={center} zoom={13}>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Circle center={center} fillColor='blue' onClick={this.onClickCircle} radius={200}>
          <Tooltip>
            <span>{clickedText}</span>
          </Tooltip>
        </Circle>
        <CircleMarker center={[51.51, -0.12]} color='red' radius={20}>
          <Tooltip>
            <span>Tooltip for CircleMarker</span>
          </Tooltip>
        </CircleMarker>
        <Polygon color='purple' positions={multiPolygon}>
          <Tooltip sticky>
            <span>sticky Tooltip for Polygon</span>
          </Tooltip>
        </Polygon>
        <Rectangle bounds={rectangle} color='black'>
          <Tooltip direction='bottom' offset={[0, 20]} opacity={1} permanent>
            <span>permanent Tooltip for Rectangle</span>
          </Tooltip>
        </Rectangle>
      </Map>
    )
  }
}

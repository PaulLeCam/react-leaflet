// @flow

import React, { Component } from 'react'
import { Map, TileLayer, Rectangle } from '../../src'

const outer = [[50.505, -29.09], [52.505, 29.09]]
const inner = [[49.505, -2.09], [53.505, 2.09]]

type State = {
  bounds: Array<[number, number]>,
}

export default class BoundsExample extends Component<{}, State> {
  state = {
    bounds: outer,
  }

  onClickInner = () => {
    this.setState({ bounds: inner })
  }

  onClickOuter = () => {
    this.setState({ bounds: outer })
  }

  render() {
    return (
      <Map bounds={this.state.bounds}>
        <TileLayer
          attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Rectangle
          bounds={outer}
          color={this.state.bounds === outer ? 'red' : 'white'}
          onClick={this.onClickOuter}
        />
        <Rectangle
          bounds={inner}
          color={this.state.bounds === inner ? 'red' : 'white'}
          onClick={this.onClickInner}
        />
      </Map>
    )
  }
}

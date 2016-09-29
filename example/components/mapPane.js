import React, { Component } from 'react'
import { Pane, TileLayer, Rectangle } from '../../src'

const outer = [
  [50.505, -29.09],
  [52.505, 29.09],
]
const inner = [
  [49.505, -2.09],
  [53.505, 2.09],
]

export default class PaneExample extends Component {
  state = {
    bounds: outer,
  }

  onClickInner = () => {
    this.setState({bounds: inner})
  }

  onClickOuter = () => {
    this.setState({bounds: outer})
  }

  render () {
    return (
      <Map bounds={this.state.bounds}>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        <Pane name='cyan-rectangle'>
          <Rectangle
            bounds={outer}
            zIndex={500}
            color={'Cyan'}
          />
        </Pane>

        <Pane name='yellow-rectangle'>
          <Rectangle
            bounds={inner}
            color={'Yellow'}
            zIndex={499}
          />
        </Pane>
      </Map>
    )
  }
}

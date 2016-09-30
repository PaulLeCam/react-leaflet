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
        <Pane name='cyan-rectangle' style={{
          zIndex: 500,
        }}>
          <Rectangle
            bounds={outer}
            color={'Cyan'}
          />
        </Pane>

        <Pane name='yellow-rectangle' style={{
          zIndex: 499,
        }}>
          <Rectangle
            bounds={inner}
            color={'Yellow'}
          />

          {/* Nested Pane */}
          <Pane name='purple-rectangle' className={'purplePane-purplePane'}>
            <Rectangle
              bounds={outer}
              color={'Purple'}
            />
          </Pane>
        </Pane>
      </Map>
    )
  }
}

import React, { Component } from 'react'
import { Map, Pane, TileLayer, Rectangle } from '../../src'

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
    render: true,
  }

  componentDidMount () {
    setInterval(() => {
      this.setState({
        render: !this.state.render,
      })
    }, 5000)
  }

  render () {
    return (
      <Map bounds={outer}>
        <TileLayer
          attribution='&copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
        {this.state.render ? (
          <Pane name='cyan-rectangle' style={{zIndex: 500}}>
            <Rectangle bounds={outer} color='cyan' />
          </Pane>
        ) : null}
        <Pane name='yellow-rectangle' style={{zIndex: 499}}>
          <Rectangle bounds={inner} color='yellow' />
          <Pane name='purple-rectangle' className='purplePane-purplePane'>
            <Rectangle bounds={outer} color='purple' />
          </Pane>
        </Pane>
      </Map>
    )
  }
}

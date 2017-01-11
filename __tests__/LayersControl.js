/* global describe, expect, it */

import Leaflet from 'leaflet'
import React, { Component } from 'react'
import { renderIntoDocument } from 'react-addons-test-utils'

import LayersControl from '../src/LayersControl'
import Map from '../src/Map'

describe('LayersControl', () => {
  it('passes its `map` context to its children', () => {
    class ChildComponent extends Component {
      static contextTypes = {
        map: React.PropTypes.instanceOf(Leaflet.Map),
      }

      componentWillMount () {
        expect(this.context.map).toBeDefined()
      }

      render () {
        return null
      }
    }

    renderIntoDocument(
      <Map>
        <LayersControl>
          <LayersControl.Overlay checked name='test'>
            <ChildComponent />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>
    )
  })
})

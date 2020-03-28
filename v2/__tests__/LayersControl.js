/* global describe, expect, it */

import React, { Component } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'

import { LayersControl, Map, withLeaflet } from '../src'

describe('LayersControl', () => {
  it('injects the `layerContainer` object to the leaflet context', () => {
    class ChildComponent extends Component {
      constructor(props) {
        super(props)
        expect(props.leaflet.layerContainer).toBeDefined()
      }

      render() {
        return null
      }
    }
    const Child = withLeaflet(ChildComponent)

    renderIntoDocument(
      <Map>
        <LayersControl>
          <LayersControl.Overlay checked name="test">
            <Child />
          </LayersControl.Overlay>
        </LayersControl>
      </Map>,
    )
  })
})

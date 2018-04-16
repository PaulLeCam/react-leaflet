/* global describe, expect, it, jest */

import React, { Component } from 'react'
import { renderIntoDocument } from 'react-dom/test-utils'

import { Map, MapLayer, withLeaflet } from '../src'

describe('MapLayer', () => {
  it('injects the `leaflet` context if provided', () => {
    const mockElement = jest.fn()

    class TestComponent extends MapLayer {
      constructor(props) {
        super(props)
        expect(props.leaflet.popupContainer).not.toBeDefined()
        this.contextValue = {
          ...props.leaflet,
          popupContainer: this.leafletElement,
        }
      }

      createLeafletElement() {
        return mockElement
      }
    }
    const Test = withLeaflet(TestComponent)

    class ChildComponent extends Component {
      constructor(props) {
        super(props)
        expect(props.leaflet.popupContainer).toBe(mockElement)
      }

      render() {
        return null
      }
    }
    const Child = withLeaflet(ChildComponent)

    renderIntoDocument(
      <Map>
        <Test>
          <Child />
        </Test>
      </Map>,
    )
  })
})

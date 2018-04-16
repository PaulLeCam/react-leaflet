/* global describe, expect, it */

import ReactDOM from 'react-dom'
import React, { createRef, Component } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { renderIntoDocument } from 'react-dom/test-utils'

import Map from '../src/Map'

describe('Map', () => {
  it('only renders the container div server-side', () => {
    const TestComponent = () => <span>test</span>

    const component = (
      <Map>
        <TestComponent />
      </Map>
    )
    const html = renderToStaticMarkup(component)

    expect(html).toBe('<div></div>')
  })

  it('sets center and zoom props', () => {
    const center = [1.2, 3.4]
    const zoom = 10

    const map = renderIntoDocument(<Map center={center} zoom={zoom} />)
    const mapLeaflet = map.leafletElement

    expect(mapLeaflet.getCenter().lat).toBe(center[0])
    expect(mapLeaflet.getCenter().lng).toBe(center[1])
    expect(mapLeaflet.getZoom()).toBe(zoom)
  })

  it('sets bounds', () => {
    const bounds = [[0, 0], [2, 2]]
    const map = renderIntoDocument(<Map bounds={bounds} />)
    const mapBounds = map.leafletElement.getBounds()
    expect(mapBounds).toEqual(bounds)
  })

  it('updates center and zoom props', () => {
    class TestComponent extends Component {
      constructor() {
        super()
        this.state = {
          center: [1.2, 3.4],
          zoom: 10,
        }
        this.mapRef = createRef()
      }

      getLeafletMap() {
        return this.mapRef.current.leafletElement
      }

      updatePosition() {
        this.setState({
          center: [2.3, 4.5],
          zoom: 12,
        })
      }

      render() {
        return (
          <Map
            center={this.state.center}
            ref={this.mapRef}
            zoom={this.state.zoom}
          />
        )
      }
    }

    const component = renderIntoDocument(<TestComponent />)
    const mapLeaflet = component.getLeafletMap()

    expect(mapLeaflet.getCenter().lat).toBe(1.2)
    expect(mapLeaflet.getCenter().lng).toBe(3.4)
    expect(mapLeaflet.getZoom()).toBe(10)

    component.updatePosition()
    expect(mapLeaflet.getCenter().lat).toBe(2.3)
    expect(mapLeaflet.getCenter().lng).toBe(4.5)
    expect(mapLeaflet.getZoom()).toBe(12)
  })

  it('updates bounds props', () => {
    const firstBounds = [[0, 0], [2, 2]]
    const secondBounds = [[0, 0], [-2, -2]]

    class TestComponent extends Component {
      constructor() {
        super()
        this.state = {
          bounds: firstBounds,
        }
        this.mapRef = createRef()
      }

      getLeafletMap() {
        return this.mapRef.current.leafletElement
      }

      updatePosition() {
        this.setState({
          bounds: secondBounds,
        })
      }

      render() {
        return <Map bounds={this.state.bounds} ref={this.mapRef} />
      }
    }

    const component = renderIntoDocument(<TestComponent />)
    const mapLeaflet = component.getLeafletMap()

    expect(mapLeaflet.getBounds()).toEqual(firstBounds)
    component.updatePosition()
    expect(mapLeaflet.getBounds()).toEqual(secondBounds)
  })

  it('passes viewport options', () => {
    const firstBounds = [[0, 0], [2, 2]]
    const secondBounds = [[0, 0], [-2, -2]]

    class TestComponent extends Component {
      constructor(props) {
        super(props)
        this.state = {
          bounds: firstBounds,
        }
        this.mapRef = createRef()
      }

      getLeafletMap() {
        return this.mapRef.current.leafletElement
      }

      updatePosition() {
        this.setState({
          bounds: secondBounds,
        })
      }

      render() {
        const viewport = {
          center: [2.1, 4.3],
          zoom: 5,
        }

        return (
          <Map
            bounds={this.state.bounds}
            viewport={viewport}
            ref={this.mapRef}
          />
        )
      }
    }

    const component = renderIntoDocument(<TestComponent />)
    const mapLeaflet = component.getLeafletMap()

    expect(mapLeaflet.getBounds()).toEqual(firstBounds)
    expect(mapLeaflet.getCenter().lat).toBe(2.1)
    expect(mapLeaflet.getCenter().lng).toBe(4.3)
    expect(mapLeaflet.getZoom()).toBe(5)
    component.updatePosition()
  })

  it('removes leaflet element on close', () => {
    const firstBounds = [[0, 0], [2, 2]]

    class TestComponent extends Component {
      constructor(props) {
        super(props)
        this.state = {
          bounds: firstBounds,
        }
        this.mapRef = createRef()
      }

      getLeafletMap() {
        return this.mapRef.current.leafletElement
      }

      render() {
        return <Map bounds={this.state.bounds} ref={this.mapRef} />
      }
    }

    const component = renderIntoDocument(<TestComponent />)
    const mapLeaflet = component.getLeafletMap()

    expect(mapLeaflet.getBounds()).toEqual(firstBounds)
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode)
    // slight timeout to ensure teardown.
    setTimeout(() => {
      expect(mapLeaflet).toBe(null)
    })
  })
})

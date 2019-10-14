import 'snapshot-diff/extend-expect'
import { render } from '@testing-library/react'
import { LatLngExpression } from 'leaflet'
import React, { useRef, useState } from 'react'

import { Map, TileLayer, useLeafletContext } from '../src'

describe('Map', () => {
  it('renders the containing div', () => {
    const { container } = render(<Map center={[0, 0]} zoom={10} />)
    expect(container).toMatchSnapshot()
  })

  it('provides the Leaflet Map element as ref once created', done => {
    function TestContainer() {
      const mapRef = useRef(null)

      return (
        <Map
          ref={mapRef}
          center={[0, 0]}
          zoom={10}
          whenCreated={map => {
            // When this callback is called, the ref should contain the element
            expect(map).toBe(mapRef.current.element)
            done()
          }}
        />
      )
    }

    render(<TestContainer />)
  })

  it('injects the context', done => {
    function TestChild(props) {
      const context = useLeafletContext()
      expect(props.map).toBe(context.map)
      done()
      return null
    }

    function TestContainer() {
      const [map, setMap] = useState(null)
      return (
        <Map center={[0, 0]} zoom={10} whenCreated={setMap}>
          {map ? <TestChild map={map} /> : null}
        </Map>
      )
    }

    render(<TestContainer />)
  })

  it('sets center and zoom props', done => {
    const center: LatLngExpression = [1.2, 3.4]
    const zoom = 10

    render(
      <Map
        center={center}
        zoom={zoom}
        whenCreated={map => {
          expect(map.getCenter()).toEqual({ lat: 1.2, lng: 3.4 })
          console.log('bounds', map.getBounds().getSouthEast())
          expect(map.getZoom()).toBe(zoom)
          done()
        }}
      />,
    )
  })

  it('updates the center', () => {
    const center: LatLngExpression = [1.2, 3.4]
    const zoom = 10

    const { asFragment, rerender } = render(
      <Map center={center} zoom={zoom}>
        <TileLayer attribution="tiles" url="http://localhost" />
      </Map>,
    )
    const firstRender = asFragment()

    rerender(
      <Map center={[5.6, 7.8]} zoom={zoom}>
        <TileLayer attribution="tiles" url="http://localhost" />
      </Map>,
    )
    expect(firstRender).toMatchDiffSnapshot(asFragment())
  })
})

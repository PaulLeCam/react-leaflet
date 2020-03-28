import 'snapshot-diff/extend-expect'
import { render } from '@testing-library/react'
import { LatLngExpression } from 'leaflet'
import React, { useRef, useState } from 'react'

import { MapProvider, TileLayer, useLeafletContext } from '../src'

describe('MapProvider', () => {
  it('renders the containing div', () => {
    const { container } = render(<MapProvider center={[0, 0]} zoom={10} />)
    expect(container).toMatchSnapshot()
  })

  it('provides the Leaflet Map element as ref once created', (done) => {
    function TestContainer() {
      const mapRef = useRef(null)

      return (
        <MapProvider
          ref={mapRef}
          center={[0, 0]}
          zoom={10}
          whenCreated={(map) => {
            // When this callback is called, the ref should contain the element
            expect(map).toBe(mapRef.current.element)
            done()
          }}
        />
      )
    }

    render(<TestContainer />)
  })

  it('injects the context', (done) => {
    function TestChild(props) {
      const context = useLeafletContext()
      expect(props.map).toBe(context.map)
      done()
      return null
    }

    function TestContainer() {
      const [map, setMap] = useState(null)
      return (
        <MapProvider center={[0, 0]} zoom={10} whenCreated={setMap}>
          {map ? <TestChild map={map} /> : null}
        </MapProvider>
      )
    }

    render(<TestContainer />)
  })

  it('sets center and zoom props', (done) => {
    const center: LatLngExpression = [1.2, 3.4]
    const zoom = 10

    render(
      <MapProvider
        center={center}
        zoom={zoom}
        whenCreated={(map) => {
          expect(map.getCenter()).toEqual({ lat: 1.2, lng: 3.4 })
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
      <MapProvider center={center} zoom={zoom}>
        <TileLayer attribution="tiles" url="http://localhost" />
      </MapProvider>,
    )
    const firstRender = asFragment()

    rerender(
      <MapProvider center={[5.6, 7.8]} zoom={zoom}>
        <TileLayer attribution="tiles" url="http://localhost" />
      </MapProvider>,
    )
    expect(firstRender).toMatchDiffSnapshot(asFragment())
  })
})

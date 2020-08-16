import { render } from '@testing-library/react'
import { LatLngExpression, Map } from 'leaflet'
import React from 'react'

import { MapConsumer, MapContainer, useMap } from '../src'

describe('MapContainer', () => {
  test('renders the containing div', () => {
    const { container } = render(<MapContainer center={[0, 0]} zoom={10} />)
    expect(container).toMatchSnapshot()
  })

  describe('provides the Map instance', () => {
    test('with the useMap() hook', (done) => {
      function TestChild() {
        const map = useMap()
        expect(map).toBeInstanceOf(Map)
        done()
        return null
      }

      function TestContainer() {
        return (
          <MapContainer center={[0, 0]} zoom={10}>
            <TestChild />
          </MapContainer>
        )
      }

      render(<TestContainer />)
    })

    test('in the <MapConsumer> component', (done) => {
      function TestContainer() {
        return (
          <MapContainer center={[0, 0]} zoom={10}>
            <MapConsumer>
              {(map) => {
                expect(map).toBeInstanceOf(Map)
                done()
                return null
              }}
            </MapConsumer>
          </MapContainer>
        )
      }

      render(<TestContainer />)
    })

    test('in the whenCreated() callback', (done) => {
      function TestContainer() {
        return (
          <MapContainer
            center={[0, 0]}
            zoom={10}
            whenCreated={(map) => {
              // When this callback is called, the ref should contain the element
              expect(map).toBeInstanceOf(Map)
              done()
            }}
          />
        )
      }

      render(<TestContainer />)
    })
  })

  test('sets center and zoom props', (done) => {
    const center: LatLngExpression = [1.2, 3.4]
    const zoom = 10

    render(
      <MapContainer
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
})

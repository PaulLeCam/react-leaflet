import { render } from '@testing-library/react'
import { type LatLngExpression, Map } from 'leaflet'
import React, { useEffect, useRef } from 'react'

import { MapContainer, useMap } from '../src'

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

    test('in the ref function', (done) => {
      const ref = (map) => {
        if (map !== null) {
          expect(map).toBeInstanceOf(Map)
          done()
        }
      }

      function TestContainer() {
        return <MapContainer center={[0, 0]} zoom={10} ref={ref} />
      }

      render(<TestContainer />)
    })

    test('in the ref object', (done) => {
      function Wrapper() {
        const ref = useRef()

        useEffect(() => {
          setTimeout(() => {
            if (ref.current !== null) {
              expect(ref.current).toBeInstanceOf(Map)
              done()
            }
          }, 50)
        }, [])

        return <MapContainer center={[0, 0]} zoom={10} ref={ref} />
      }

      render(<Wrapper />)
    })
  })

  test('sets center and zoom props', (done) => {
    const center: LatLngExpression = [1.2, 3.4]
    const zoom = 10

    const ref = (map) => {
      if (map !== null) {
        expect(map.getCenter()).toEqual({ lat: 1.2, lng: 3.4 })
        expect(map.getZoom()).toBe(zoom)
        done()
      }
    }

    render(<MapContainer center={center} zoom={zoom} ref={ref} />)
  })
})

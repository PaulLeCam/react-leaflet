import { render } from '@testing-library/react'
import { type LatLngExpression, Map as LeafletMap } from 'leaflet'
import React, { StrictMode, useEffect, useRef } from 'react'

import { MapContainer, useMap } from '../src'

describe('MapContainer', () => {
  test('renders the containing div', () => {
    const { container } = render(
      <StrictMode>
        <MapContainer center={[0, 0]} zoom={10} />
      </StrictMode>,
    )
    expect(container).toMatchSnapshot()
  })

  test('re-renders the containing div', () => {
    const { container, rerender } = render(
      <StrictMode>
        <MapContainer key="one" center={[0, 0]} zoom={10} />
      </StrictMode>,
    )
    rerender(
      <StrictMode>
        <MapContainer key="two" center={[0, 0]} zoom={10} />
      </StrictMode>,
    )
    expect(container).toMatchSnapshot()
  })

  describe('provides the Map instance', () => {
    test('with the useMap() hook', (done) => {
      let doneCalled = false

      function TestChild() {
        const map = useMap()
        expect(map).toBeInstanceOf(LeafletMap)
        if (!doneCalled) {
          doneCalled = true
          done()
        }
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
      let doneCalled = false

      const ref = (map) => {
        if (map != null) {
          expect(map).toBeInstanceOf(LeafletMap)
          if (!doneCalled) {
            doneCalled = true
            done()
          }
        }
      }

      function TestContainer() {
        return <MapContainer center={[0, 0]} zoom={10} ref={ref} />
      }

      render(<TestContainer />)
    })

    test('in the ref object', (done) => {
      let doneCalled = false

      function Wrapper() {
        const ref = useRef(undefined)

        useEffect(() => {
          setTimeout(() => {
            if (ref.current != null) {
              expect(ref.current).toBeInstanceOf(LeafletMap)
              if (!doneCalled) {
                doneCalled = true
                done()
              }
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
    let doneCalled = false

    const ref = (map) => {
      if (map != null) {
        expect(map.getCenter()).toEqual({ lat: 1.2, lng: 3.4 })
        expect(map.getZoom()).toBe(zoom)
        if (!doneCalled) {
          doneCalled = true
          done()
        }
      }
    }

    render(<MapContainer center={center} zoom={zoom} ref={ref} />)
  })
})

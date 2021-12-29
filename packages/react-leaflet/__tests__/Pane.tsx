import { render } from '@testing-library/react'
import React, { useEffect, useRef } from 'react'

import { MapContainer, Pane, TileLayer } from '../src'

describe('Pane', () => {
  test('renders', () => {
    const { container } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <Pane name="foo" style={{ zIndex: 1000 }}>
          <TileLayer attribution="tiles attribution" url="http://localhost" />
        </Pane>
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()
  })

  test('renders in Strict Mode', () => {
    const { container } = render(
      <React.StrictMode>
        <MapContainer center={[0, 0]} zoom={10}>
          <Pane name="foo" style={{ zIndex: 1001 }}>
            <TileLayer attribution="tiles attribution" url="http://localhost" />
          </Pane>
        </MapContainer>
      </React.StrictMode>,
    )
    expect(container).toMatchSnapshot()
  })

  test('renders nested panes', () => {
    const { container } = render(
      <React.StrictMode>
        <MapContainer center={[0, 0]} zoom={10}>
          <Pane name="foo" style={{ zIndex: 1001 }}>
            <Pane name="bar" style={{ zIndex: 4000 }}>
              <TileLayer
                attribution="tiles attribution"
                url="http://localhost/nested"
              />
            </Pane>
            <TileLayer
              attribution="tiles attribution"
              url="http://localhost/not-nested"
            />
          </Pane>
        </MapContainer>
      </React.StrictMode>,
    )
    expect(container).toMatchSnapshot()
  })

  test('can unmount and remount with the same name', () => {
    const { rerender, container } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <Pane name="foo" style={{ zIndex: 1001 }}>
          <Pane name="bar" style={{ zIndex: 4000 }}>
            <TileLayer
              attribution="tiles attribution"
              url="http://localhost/nested"
            />
          </Pane>
          <TileLayer
            attribution="tiles attribution"
            url="http://localhost/not-nested"
          />
        </Pane>
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()

    rerender(<MapContainer center={[0, 0]} zoom={10}></MapContainer>)
    expect(container).toMatchSnapshot()

    rerender(
      <MapContainer center={[0, 0]} zoom={10}>
        <Pane name="bar" style={{ zIndex: 1001 }}>
          <Pane name="foo" style={{ zIndex: 4000 }}>
            <TileLayer
              attribution="tiles attribution"
              url="http://localhost/new-foo-nested"
            />
          </Pane>
          <TileLayer
            attribution="tiles attribution"
            url="http://localhost/new-bar-not-nested"
          />
        </Pane>
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()
  })

  describe('supports refs', () => {
    test('as callback function', (done) => {
      const ref = (pane) => {
        expect(pane).toBeInstanceOf(HTMLElement)
        done()
      }

      function TestContainer() {
        return (
          <MapContainer center={[0, 0]} zoom={10}>
            <Pane name="foo" style={{ zIndex: 1000 }} ref={ref}>
              <TileLayer
                attribution="tiles attribution"
                url="http://localhost"
              />
            </Pane>
          </MapContainer>
        )
      }

      render(<TestContainer />)
    })

    test('as object', (done) => {
      function Wrapper() {
        const ref = useRef()

        useEffect(() => {
          setTimeout(() => {
            expect(ref.current).toBeInstanceOf(HTMLElement)
            done()
          }, 50)
        }, [])

        return (
          <MapContainer center={[0, 0]} zoom={10}>
            <Pane name="foo" style={{ zIndex: 1000 }} ref={ref}>
              <TileLayer
                attribution="tiles attribution"
                url="http://localhost"
              />
            </Pane>
          </MapContainer>
        )
      }

      render(<Wrapper />)
    })
  })
})

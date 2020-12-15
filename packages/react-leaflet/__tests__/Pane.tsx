import { render } from '@testing-library/react'
import React from 'react'

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
})

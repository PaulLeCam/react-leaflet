import { render } from '@testing-library/react'
import React from 'react'

import { MapContainer, TileLayer } from '../src'

describe('TileLayer', () => {
  test('renders', () => {
    const { container, rerender } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <TileLayer attribution="tiles attribution" url="http://localhost" />
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()

    rerender(
      <MapContainer center={[0, 0]} zoom={10}>
        <TileLayer
          attribution="tiles attribution"
          url="http://localhost?with_parameter=changed"
        />
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()
  })
})

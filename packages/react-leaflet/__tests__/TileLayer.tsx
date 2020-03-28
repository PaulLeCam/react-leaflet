import { render } from '@testing-library/react'
import React from 'react'

import { MapProvider, TileLayer } from '../src'

describe('TileLayer', () => {
  it('renders', () => {
    const { container } = render(
      <MapProvider center={[0, 0]} zoom={10}>
        <TileLayer attribution="tiles attribution" url="http://localhost" />
      </MapProvider>,
    )
    expect(container).toMatchSnapshot()
  })
})

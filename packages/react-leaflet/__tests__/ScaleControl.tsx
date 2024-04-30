import { render } from '@testing-library/react'
import React from 'react'

import { MapContainer, ScaleControl } from '../src'

describe('ScaleControl', () => {
  test('renders and unmounts', () => {
    const { container, unmount } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <ScaleControl position="bottomleft" />
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()
    unmount()
  })
})

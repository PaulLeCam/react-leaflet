import { render } from '@testing-library/react'
import React from 'react'

import { AttributionControl, MapContainer } from '../src'

describe('AttributionControl', () => {
  test('renders and unmounts', () => {
    const { container, unmount } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <AttributionControl position="bottomleft" />
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()
    unmount()
  })
})

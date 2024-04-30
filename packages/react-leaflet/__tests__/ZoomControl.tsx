import { render } from '@testing-library/react'
import React from 'react'

import { MapContainer, ZoomControl } from '../src'

describe('ZoomControl', () => {
  test('renders and unmounts', () => {
    const { container, unmount } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <ZoomControl position="bottomleft" />
      </MapContainer>,
    )
    expect(container).toMatchSnapshot()
    unmount()
  })
})

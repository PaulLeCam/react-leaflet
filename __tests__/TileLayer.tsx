import { render } from '@testing-library/react'
import React from 'react'

import { Map, TileLayer } from '../src'

describe('TileLayer', () => {
  it('renders', () => {
    const { container } = render(
      <Map center={[0, 0]} zoom={10}>
        <TileLayer attribution="tiles attribution" url="http://localhost" />
      </Map>,
    )
    expect(container).toMatchSnapshot()
  })
})

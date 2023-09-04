import { render } from '@testing-library/react'
import React from 'react'
import L from 'leaflet'

import { MapContainer, LayersControl, CustomizableLayersControl, TileLayer } from '../src'

describe('LayersControl', () => {
  test('renders Control.Layers', () => {
    const { container } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <LayersControl>
          <LayersControl.BaseLayer></LayersControl.BaseLayer>
          <LayersControl.BaseLayer></LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>,
    )

    expect(container).toMatchSnapshot()
  })

  test('renders Custom class', () => {
    const Control = CustomizableLayersControl(class extends L.Control.Layers {
        _initLayout() {
          this._container = L.DomUtil.create('ol')
        }

        _update() {
          L.DomUtil.empty(this._container);
          for (let i = 0; i < this._layers.length; ++i) {
            this._container.appendChild(L.DomUtil.create('li'))
          }
        }
      },
    )

    const { container } = render(
      <MapContainer center={[0, 0]} zoom={10}>
        <Control>
          <Control.BaseLayer>
            <TileLayer url="http://localhost/1" />
          </Control.BaseLayer>
          <Control.BaseLayer>
            <TileLayer url="http://localhost/2" />
          </Control.BaseLayer>
        </Control>
      </MapContainer>,
    )

    expect(container).toMatchSnapshot()
  })
})

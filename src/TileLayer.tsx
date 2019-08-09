import { TileLayer, TileLayerOptions } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { updateGridLayer } from './core/grid-layer'
import { createUseLeafletLayer } from './core/layer'

export interface TileLayerProps extends TileLayerOptions, EventedProps {
  url: string
}

export const useTileLayerElement = createUseLeafletElement<
  TileLayer,
  TileLayerProps
>(function createTileLayer(props) {
  const { url, ...options } = props
  return { el: new TileLayer(url, options) }
}, updateGridLayer)

export const useLeafletTileLayer = createUseLeafletLayer(useTileLayerElement)

export const LeafletTileLayer = createLeafComponent(useLeafletTileLayer)

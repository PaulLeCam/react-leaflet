import { TileLayer, TileLayerOptions } from 'leaflet'

import { createLeafComponent } from './component'
import { createUseLeafletElement } from './element'
import { updateGridLayer } from './grid-layer'
import { createUseLeafletLayer } from './layer'

export interface TileLayerProps extends TileLayerOptions {
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

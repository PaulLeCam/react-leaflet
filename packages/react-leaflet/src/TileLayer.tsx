import {
  type LayerProps,
  createElementObject,
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core'
import { TileLayer as LeafletTileLayer, type TileLayerOptions } from 'leaflet'

export interface TileLayerProps extends TileLayerOptions, LayerProps {
  url: string
}

export const TileLayer = createTileLayerComponent<
  LeafletTileLayer,
  TileLayerProps
>(function createTileLayer({ url, ...options }, context) {
  const layer = new LeafletTileLayer(url, withPane(options, context))
  return createElementObject(layer, context)
}, updateGridLayer)

import {
  EventedProps,
  createTileLayerComponent,
  updateGridLayer,
} from '@react-leaflet/core'
import { TileLayer as LeafletTileLayer, TileLayerOptions } from 'leaflet'

export interface TileLayerProps extends TileLayerOptions, EventedProps {
  url: string
}

export const TileLayer = createTileLayerComponent<
  LeafletTileLayer,
  TileLayerProps
>(function createTileLayer({ url, ...options }, context) {
  return { instance: new LeafletTileLayer(url, options), context }
}, updateGridLayer)

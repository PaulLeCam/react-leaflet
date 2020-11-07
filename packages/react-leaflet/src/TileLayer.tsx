import {
  LayerProps,
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core'
import { TileLayer as LeafletTileLayer, TileLayerOptions } from 'leaflet'

export interface TileLayerProps extends TileLayerOptions, LayerProps {
  url: string
}

export const TileLayer = createTileLayerComponent<
  LeafletTileLayer,
  TileLayerProps
>(function createTileLayer({ url, ...options }, context) {
  return {
    instance: new LeafletTileLayer(url, withPane(options, context)),
    context,
  }
}, updateGridLayer)

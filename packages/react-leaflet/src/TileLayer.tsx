import {
  createElementObject,
  createTileLayerComponent,
  type LayerProps,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core'
import { TileLayer as LeafletTileLayer, type TileLayerOptions } from 'leaflet'

import type { WithoutIndexSignature } from './props.js'

export interface TileLayerProps
  extends WithoutIndexSignature<TileLayerOptions>,
    LayerProps<LeafletTileLayer> {
  url: string
}

export const TileLayer = createTileLayerComponent<
  LeafletTileLayer,
  TileLayerProps
>(
  function createTileLayer({ url, ...options }, context) {
    const layer = new LeafletTileLayer(url, withPane(options, context))
    return createElementObject(layer, context)
  },
  function updateTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps)

    const { url } = props
    if (url != null && url !== prevProps.url) {
      layer.setUrl(url)
    }
  },
)

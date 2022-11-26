import type { TileLayer, TileLayerOptions } from 'leaflet'
import { updateGridLayer } from './grid-layer'

interface ReactLeafletTileLayerOptions extends TileLayerOptions {
  url: string
}

export function updateTileLayer<
  E extends TileLayer,
  P extends ReactLeafletTileLayerOptions,
>(layer: E, props: P, prevProps: P) {
  updateGridLayer(layer, props, prevProps)

  const { url } = props
  if (url != null && url !== prevProps.url) {
    layer.setUrl(url)
  }
}

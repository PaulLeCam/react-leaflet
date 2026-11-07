import {
  createElementObject,
  createTileLayerComponent,
  type LayerProps,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core'
import {
  WMSTileLayer as LeafletWMSTileLayer,
  type WMSParams,
  type WMSTileLayerOptions,
} from 'leaflet'

import type { WithoutIndexSignature } from './props.js'

export interface WMSTileLayerProps
  extends WithoutIndexSignature<WMSTileLayerOptions>,
    LayerProps {
  params?: WMSParams
  url: string
}

export const WMSTileLayer = createTileLayerComponent<
  LeafletWMSTileLayer,
  WMSTileLayerProps
>(
  function createWMSTileLayer(
    { eventHandlers: _eh, params = {}, url, ...options },
    context,
  ) {
    const layer = new LeafletWMSTileLayer(url, {
      ...params,
      ...withPane(options, context),
    })
    return createElementObject(layer, context)
  },
  function updateWMSTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params)
    }
  },
)

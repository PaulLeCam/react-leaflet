import { TileLayer, WMSOptions, WMSParams } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { updateGridLayer } from './core/grid-layer'
import { createUseLeafletLayer } from './core/layer'

export interface WMSTileLayerProps extends WMSOptions, EventedProps {
  params?: WMSParams
  url: string
}

export const useWMSTileLayerElement = createUseLeafletElement<
  TileLayer.WMS,
  WMSTileLayerProps
>(
  function createWMSTileLayer({ params = {}, url, ...options }) {
    return { instance: new TileLayer.WMS(url, { ...params, ...options }) }
  },
  function updateWMSTileLayer(layer, props, prevProps) {
    updateGridLayer(layer, props, prevProps)

    if (props.params != null && props.params !== prevProps.params) {
      layer.setParams(props.params)
    }
  },
)

export const useLeafletWMSTileLayer = createUseLeafletLayer(
  useWMSTileLayerElement,
)

export const LeafletWMSTileLayer = createLeafComponent(useLeafletWMSTileLayer)

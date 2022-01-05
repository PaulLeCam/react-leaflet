import {
  type LayerProps,
  createElementObject,
  createTileLayerComponent,
  updateGridLayer,
  withPane,
} from '@react-leaflet/core'
import { TileLayer, type WMSOptions, type WMSParams } from 'leaflet'

export interface WMSTileLayerProps extends WMSOptions, LayerProps {
  params?: WMSParams
  url: string
}

export const WMSTileLayer = createTileLayerComponent<
  TileLayer.WMS,
  WMSTileLayerProps
>(
  function createWMSTileLayer({ params = {}, url, ...options }, context) {
    const layer = new TileLayer.WMS(url, {
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

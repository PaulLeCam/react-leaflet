import isEqual from 'fast-deep-equal'
import { TileLayer, WMSOptions } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { updateGridLayer } from './core/grid-layer'
import { createUseLeafletLayer } from './core/layer'

export interface WMSTileLayerProps extends WMSOptions, EventedProps {
  url: string
}

export const useWMSTileLayerElement = createUseLeafletElement<
  TileLayer.WMS,
  WMSTileLayerProps
>(
  function createWMSTileLayer(props) {
    const { url, ...options } = props
    return { el: new TileLayer.WMS(url, options) }
  },
  function updateWMSTileLayer(el, props, prevProps) {
    updateGridLayer(el, props, prevProps)

    const { url: _pu, opacity: _po, zIndex: _pz, ...prevParams } = prevProps
    const { url: _u, opacity: _o, zIndex: _z, ...params } = props

    if (!isEqual(params, prevParams)) {
      // @ts-ignore undefined params
      el.setParams(params)
    }
  },
)

export const useLeafletWMSTileLayer = createUseLeafletLayer(
  useWMSTileLayerElement,
)

export const LeafletWMSTileLayer = createLeafComponent(useLeafletWMSTileLayer)

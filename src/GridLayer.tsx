import { GridLayer, GridLayerOptions } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { updateGridLayer } from './core/grid-layer'
import { createUseLeafletLayer } from './core/layer'

export interface GridLayerProps extends GridLayerOptions, EventedProps {}

export const useGridLayerElement = createUseLeafletElement<
  GridLayer,
  GridLayerProps
>(function createGridLayer(props) {
  return { el: new GridLayer(props) }
}, updateGridLayer)

export const useLeafletGridLayer = createUseLeafletLayer(useGridLayerElement)

export const LeafletGridLayer = createLeafComponent(useLeafletGridLayer)

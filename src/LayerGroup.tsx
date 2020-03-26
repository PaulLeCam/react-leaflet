import { LayerGroup, LayerOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletLayer } from './core/layer'

export interface LayerGroupProps extends LayerOptions, EventedProps {
  children?: ReactNode
}

export const useLayerGroupElement = createUseLeafletElement<
  LayerGroup,
  LayerGroupProps
>(function createLayerGroup({ children: _c, ...options }, ctx) {
  const instance = new LayerGroup([], options)
  const context = ctx === null ? null : { ...ctx, layerContainer: instance }
  return { instance, context }
})

export const useLeafletLayerGroup = createUseLeafletLayer(useLayerGroupElement)

export const LeafletLayerGroup = createContainerComponent(useLeafletLayerGroup)

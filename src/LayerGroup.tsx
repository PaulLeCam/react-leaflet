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
>(function createLayerGroup(props, context) {
  const { children: _c, ...options } = props
  const el = new LayerGroup([], options)
  return {
    el,
    context: context === null ? null : { ...context, layerContainer: el },
  }
})

export const useLeafletLayerGroup = createUseLeafletLayer(useLayerGroupElement)

export const LeafletLayerGroup = createContainerComponent(useLeafletLayerGroup)

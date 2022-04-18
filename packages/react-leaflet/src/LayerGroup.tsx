import {
  type EventedProps,
  createElementObject,
  createLayerComponent,
  extendContext,
} from '@react-leaflet/core'
import { LayerGroup as LeafletLayerGroup, type LayerOptions } from 'leaflet'
import type { ReactNode } from 'react'

export interface LayerGroupProps extends LayerOptions, EventedProps {
  children?: ReactNode
}

export const LayerGroup = createLayerComponent<
  LeafletLayerGroup,
  LayerGroupProps
>(function createLayerGroup({ children: _c, ...options }, ctx) {
  const group = new LeafletLayerGroup([], options)
  return createElementObject(
    group,
    extendContext(ctx, { layerContainer: group }),
  )
})

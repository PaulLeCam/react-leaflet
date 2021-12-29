import { type EventedProps, createLayerComponent } from '@react-leaflet/core'
import { LayerGroup as LeafletLayerGroup, type LayerOptions } from 'leaflet'
import type { ReactNode } from 'react'

export interface LayerGroupProps extends LayerOptions, EventedProps {
  children?: ReactNode
}

export const LayerGroup = createLayerComponent<
  LeafletLayerGroup,
  LayerGroupProps
>(function createLayerGroup({ children: _c, ...options }, ctx) {
  const instance = new LeafletLayerGroup([], options)
  return { instance, context: { ...ctx, layerContainer: instance } }
})

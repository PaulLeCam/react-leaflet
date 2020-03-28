import { EventedProps, createLayerComponent } from '@react-leaflet/core'
import { LayerGroup as LeafletLayerGroup, LayerOptions } from 'leaflet'
import { ReactNode } from 'react'

export interface LayerGroupProps extends LayerOptions, EventedProps {
  children?: ReactNode
}

export const LayerGroup = createLayerComponent<
  LeafletLayerGroup,
  LayerGroupProps
>(function createLayerGroup({ children: _c, ...options }, ctx) {
  const instance = new LeafletLayerGroup([], options)
  const context = ctx === null ? null : { ...ctx, layerContainer: instance }
  return { instance, context }
})

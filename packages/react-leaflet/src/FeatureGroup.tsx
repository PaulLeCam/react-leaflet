import { PathProps, createPathComponent } from '@react-leaflet/core'
import { FeatureGroup as LeafletFeatureGroup } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'

export interface FeatureGroupProps extends LayerGroupProps, PathProps {}

export const FeatureGroup = createPathComponent<
  LeafletFeatureGroup,
  FeatureGroupProps
>(function createFeatureGroup({ children: _c, ...options }, ctx) {
  const instance = new LeafletFeatureGroup([], options)
  const context = {
    ...ctx,
    layerContainer: instance,
    overlayContainer: instance,
  }
  return { instance, context }
})

import { FeatureGroup } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'
import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface FeatureGroupProps extends LayerGroupProps, PathProps {}

export const useFeatureGroupElement = createUseLeafletElement<
  FeatureGroup,
  FeatureGroupProps
>(function createFeatureGroup({ children: _c, ...options }, ctx) {
  const instance = new FeatureGroup([], options)
  const context =
    ctx === null
      ? null
      : { ...ctx, layerContainer: instance, overlayContainer: instance }
  return { instance, context }
})

export const useLeafletFeatureGroup = createUseLeafletPath(
  useFeatureGroupElement,
)

export const LeafletFeatureGroup = createContainerComponent(
  useLeafletFeatureGroup,
)

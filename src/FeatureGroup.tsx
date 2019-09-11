import { FeatureGroup } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'
import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface FeatureGroupProps extends LayerGroupProps, PathProps {}

export const useFeatureGroupElement = createUseLeafletElement<
  FeatureGroup,
  FeatureGroupProps
>(function createFeatureGroup(props, context) {
  const { children: _c, ...options } = props
  const el = new FeatureGroup([], options)
  return {
    el,
    context:
      context === null
        ? null
        : { ...context, layerContainer: el, overlayContainer: el },
  }
})

export const useLeafletFeatureGroup = createUseLeafletPath(
  useFeatureGroupElement,
)

export const LeafletFeatureGroup = createContainerComponent(
  useLeafletFeatureGroup,
)

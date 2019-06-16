import { FeatureGroup, PathOptions } from 'leaflet'

import { LayerGroupProps } from './LayerGroup'
import { createContextComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { createUseLeafletPath } from './core/path'

export interface FeatureGroupProps extends LayerGroupProps, PathOptions {}

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

export const LeafletFeatureGroup = createContextComponent(
  useLeafletFeatureGroup,
)

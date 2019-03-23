import { FeatureGroup, PathOptions } from 'leaflet'

import { createContextComponent } from './component'
import { createUseLeafletElement } from './element'
import { createUseLeafletPath } from './path'
import { LayerGroupProps } from './LayerGroup'

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

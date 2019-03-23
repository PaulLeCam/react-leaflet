import { Control } from 'leaflet'

import { createLeafComponent } from './component'
import { createUseLeafletControl } from './control'
import { createUseLeafletElement } from './element'

export interface ZoomControlProps extends Control.ZoomOptions {}

export const useZoomControlElement = createUseLeafletElement<
  Control.Zoom,
  ZoomControlProps
>(function createZoomControl(props) {
  return { el: new Control.Zoom(props) }
})

export const useLeafletZoomControl = createUseLeafletControl(
  useZoomControlElement,
)

export const LeafletZoomControl = createLeafComponent(useLeafletZoomControl)

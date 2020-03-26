import { Control } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletControl } from './core/control'
import { createUseLeafletElement } from './core/element'

export interface ZoomControlProps extends Control.ZoomOptions {}

export const useZoomControlElement = createUseLeafletElement<
  Control.Zoom,
  ZoomControlProps
>(function createZoomControl(props) {
  return { instance: new Control.Zoom(props) }
})

export const useLeafletZoomControl = createUseLeafletControl(
  useZoomControlElement,
)

export const LeafletZoomControl = createLeafComponent(useLeafletZoomControl)

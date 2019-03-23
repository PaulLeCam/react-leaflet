import { Control } from 'leaflet'

import { createLeafComponent } from './component'
import { createUseLeafletControl } from './control'
import { createUseLeafletElement } from './element'

export interface ScaleControlProps extends Control.ScaleOptions {}

export const useScaleControlElement = createUseLeafletElement<
  Control.Scale,
  ScaleControlProps
>(function createScaleControl(props) {
  return { el: new Control.Scale(props) }
})

export const useLeafletScaleControl = createUseLeafletControl(
  useScaleControlElement,
)

export const LeafletScaleControl = createLeafComponent(useLeafletScaleControl)

import { Control } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletControl } from './core/control'
import { createUseLeafletElement } from './core/element'

export interface ScaleControlProps extends Control.ScaleOptions {}

export const useScaleControlElement = createUseLeafletElement<
  Control.Scale,
  ScaleControlProps
>(function createScaleControl(props) {
  return { instance: new Control.Scale(props) }
})

export const useLeafletScaleControl = createUseLeafletControl(
  useScaleControlElement,
)

export const LeafletScaleControl = createLeafComponent(useLeafletScaleControl)

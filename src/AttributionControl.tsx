import { Control } from 'leaflet'

import { createLeafComponent } from './component'
import { createUseLeafletControl } from './control'
import { createUseLeafletElement } from './element'

export interface AttributionControlProps extends Control.AttributionOptions {}

export const useAttributionControlElement = createUseLeafletElement<
  Control.Attribution,
  AttributionControlProps
>(function createAttributionControl(props) {
  return { el: new Control.Attribution(props) }
})

export const useLeafletAttributionControl = createUseLeafletControl(
  useAttributionControlElement,
)

export const LeafletAttributionControl = createLeafComponent(
  useLeafletAttributionControl,
)

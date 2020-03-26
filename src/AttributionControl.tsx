import { Control } from 'leaflet'

import { createLeafComponent } from './core/component'
import { createUseLeafletControl } from './core/control'
import { createUseLeafletElement } from './core/element'

export interface AttributionControlProps extends Control.AttributionOptions {}

export const useAttributionControlElement = createUseLeafletElement<
  Control.Attribution,
  AttributionControlProps
>(function createAttributionControl(props) {
  return { instance: new Control.Attribution(props) }
})

export const useLeafletAttributionControl = createUseLeafletControl(
  useAttributionControlElement,
)

export const LeafletAttributionControl = createLeafComponent(
  useLeafletAttributionControl,
)

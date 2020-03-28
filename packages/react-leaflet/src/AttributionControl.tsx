import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export type AttributionControlProps = Control.AttributionOptions

export const AttributionControl = createControlComponent<
  Control.Attribution,
  AttributionControlProps
>(function createAttributionControl(props) {
  return { instance: new Control.Attribution(props) }
})

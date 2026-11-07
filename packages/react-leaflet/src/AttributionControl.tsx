import { createControlComponent } from '@react-leaflet/core'
import {
  type AttributionControlOptions,
  AttributionControl as LeafletAttributionControl,
} from 'leaflet'

export type AttributionControlProps = AttributionControlOptions

export const AttributionControl = createControlComponent<
  LeafletAttributionControl,
  AttributionControlProps
>(function createAttributionControl(props) {
  return new LeafletAttributionControl(props)
})

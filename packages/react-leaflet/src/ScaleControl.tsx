import { createControlComponent } from '@react-leaflet/core'
import {
  ScaleControl as LeafletScaleControl,
  type ScaleControlOptions,
} from 'leaflet'

export type ScaleControlProps = ScaleControlOptions

export const ScaleControl = createControlComponent<
  LeafletScaleControl,
  ScaleControlProps
>(function createScaleControl(props) {
  return new LeafletScaleControl(props)
})

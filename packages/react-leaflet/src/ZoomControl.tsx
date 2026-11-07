import { createControlComponent } from '@react-leaflet/core'
import {
  ZoomControl as LeafletZoomControl,
  type ZoomControlOptions,
} from 'leaflet'

export type ZoomControlProps = ZoomControlOptions

export const ZoomControl = createControlComponent<
  LeafletZoomControl,
  ZoomControlProps
>(function createZoomControl(props) {
  return new LeafletZoomControl(props)
})

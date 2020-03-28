import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export interface ZoomControlProps extends Control.ZoomOptions {}

export const ZoomControl = createControlComponent<
  Control.Zoom,
  ZoomControlProps
>(function createZoomControl(props) {
  return { instance: new Control.Zoom(props) }
})

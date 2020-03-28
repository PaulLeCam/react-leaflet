import { createControlComponent } from '@react-leaflet/core'
import { Control } from 'leaflet'

export interface ScaleControlProps extends Control.ScaleOptions {}

export const ScaleControl = createControlComponent<
  Control.Scale,
  ScaleControlProps
>(function createScaleControl(props) {
  return { instance: new Control.Scale(props) }
})

import {
  LatLngExpression,
  CircleMarker as LeafletCircleMarker,
  CircleMarkerOptions,
} from 'leaflet'
import { ReactNode } from 'react'

import { PathProps } from './path'

export interface CircleMarkerProps extends CircleMarkerOptions, PathProps {
  center: LatLngExpression
  children?: ReactNode
}

export function updateCircle(
  layer: LeafletCircleMarker,
  props: CircleMarkerProps,
  prevProps: CircleMarkerProps,
) {
  if (props.center !== prevProps.center) {
    layer.setLatLng(props.center)
  }
  if (props.radius != null && props.radius !== prevProps.radius) {
    layer.setRadius(props.radius)
  }
}

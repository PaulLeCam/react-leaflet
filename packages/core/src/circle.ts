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

export function updateCircle<P extends CircleMarkerProps = CircleMarkerProps>(
  layer: LeafletCircleMarker,
  props: P,
  prevProps: P,
) {
  if (props.center !== prevProps.center) {
    layer.setLatLng(props.center)
  }
  if (props.radius != null && props.radius !== prevProps.radius) {
    layer.setRadius(props.radius)
  }
}

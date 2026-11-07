import type {
  CircleMarkerOptions,
  CircleOptions,
  LatLngExpression,
  Circle as LeafletCircle,
  CircleMarker as LeafletCircleMarker,
} from 'leaflet'
import type { ReactNode } from 'react'

import type { PathProps } from './path.js'

export interface CircleMarkerProps extends CircleMarkerOptions, PathProps {
  center: LatLngExpression
  children?: ReactNode
}

export interface CircleProps extends CircleOptions, PathProps {
  center: LatLngExpression
  children?: ReactNode
}

export function updateCircle<P extends CircleMarkerProps | CircleProps>(
  layer: LeafletCircle | LeafletCircleMarker,
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

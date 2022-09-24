import type {
  Circle as LeafletCircle,
  CircleMarker as LeafletCircleMarker,
  CircleMarkerOptions,
  CircleOptions,
  LatLngExpression,
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
  layer: LeafletCircle<P> | LeafletCircleMarker<P>,
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

import { PathProps, createPathComponent } from '@react-leaflet/core'
import {
  LatLngExpression,
  CircleMarker as LeafletCircleMarker,
  CircleMarkerOptions,
} from 'leaflet'
import { ReactNode } from 'react'

export interface CircleMarkerProps extends CircleMarkerOptions, PathProps {
  center: LatLngExpression
  children?: ReactNode
}

export function updateCircle<E extends LeafletCircleMarker, P>(
  layer: E,
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

export const CircleMarker = createPathComponent<
  LeafletCircleMarker,
  CircleMarkerProps
>(function createCircleMarker({ center, children: _c, ...options }, ctx) {
  const instance = new LeafletCircleMarker(center, options)
  const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
  return { instance, context }
}, updateCircle)

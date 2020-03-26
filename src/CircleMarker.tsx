import { LatLngExpression, CircleMarker, CircleMarkerOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface CircleMarkerProps extends CircleMarkerOptions, PathProps {
  center: LatLngExpression
  children?: ReactNode
}

export function updateCircle<E extends CircleMarker, P>(
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

export const useCircleMarkerElement = createUseLeafletElement<
  CircleMarker,
  CircleMarkerProps
>(function createCircleMarker({ center, children: _c, ...options }, ctx) {
  const instance = new CircleMarker(center, options)
  const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
  return { instance, context }
}, updateCircle)

export const useLeafletCircleMarker = createUseLeafletPath(
  useCircleMarkerElement,
)

export const LeafletCircleMarker = createContainerComponent(
  useLeafletCircleMarker,
)

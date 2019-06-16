import { LatLngExpression, CircleMarker, CircleMarkerOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContextComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { createUseLeafletPath } from './core/path'

export interface CircleMarkerProps extends CircleMarkerOptions {
  center: LatLngExpression
  children?: ReactNode
}

export function updateCircle<E extends CircleMarker, P>(
  el: E,
  props: CircleMarkerProps,
  prevProps: CircleMarkerProps,
) {
  if (props.center !== prevProps.center) {
    el.setLatLng(props.center)
  }
  if (props.radius != null && props.radius !== prevProps.radius) {
    el.setRadius(props.radius)
  }
}

export const useCircleMarkerElement = createUseLeafletElement<
  CircleMarker,
  CircleMarkerProps
>(function createCircleMarker(props, context) {
  const { center, ...options } = props
  const el = new CircleMarker(center, options)
  return {
    el,
    context: context === null ? null : { ...context, overlayContainer: el },
  }
}, updateCircle)

export const useLeafletCircleMarker = createUseLeafletPath(
  useCircleMarkerElement,
)

export const LeafletCircleMarker = createContextComponent(
  useLeafletCircleMarker,
)

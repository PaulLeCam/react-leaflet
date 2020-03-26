import { LatLngExpression, Polyline, PolylineOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface PolylineProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][]
}

export function updatePolyline<E extends Polyline, P extends PolylineProps>(
  layer: E,
  props: P,
  prevProps: P,
) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions)
  }
}

export const usePolylineElement = createUseLeafletElement<
  Polyline,
  PolylineProps
>(function createPolyline({ positions, ...options }, ctx) {
  const instance = new Polyline(positions, options)
  const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
  return { instance, context }
})

export const useLeafletPolyline = createUseLeafletPath(usePolylineElement)

export const LeafletPolyline = createContainerComponent(useLeafletPolyline)

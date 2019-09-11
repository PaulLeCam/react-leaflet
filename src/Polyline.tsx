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
  el: E,
  props: P,
  prevProps: P,
) {
  if (props.positions !== prevProps.positions) {
    el.setLatLngs(props.positions)
  }
}

export const usePolylineElement = createUseLeafletElement<
  Polyline,
  PolylineProps
>(function createPolyline(props, context) {
  const { positions, ...options } = props
  const el = new Polyline(positions, options)
  return {
    el,
    context: context === null ? null : { ...context, overlayContainer: el },
  }
})

export const useLeafletPolyline = createUseLeafletPath(usePolylineElement)

export const LeafletPolyline = createContainerComponent(useLeafletPolyline)

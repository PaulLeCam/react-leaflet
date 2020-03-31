import { PathProps, createPathComponent } from '@react-leaflet/core'
import {
  LatLngExpression,
  Polyline as LeafletPolyline,
  PolylineOptions,
} from 'leaflet'
import { ReactNode } from 'react'

export interface PolylineProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][]
}

export function updatePolyline<
  E extends LeafletPolyline,
  P extends PolylineProps
>(layer: E, props: P, prevProps: P) {
  if (props.positions !== prevProps.positions) {
    layer.setLatLngs(props.positions)
  }
}

export const Polyline = createPathComponent<LeafletPolyline, PolylineProps>(
  function createPolyline({ positions, ...options }, ctx) {
    const instance = new LeafletPolyline(positions, options)
    return { instance, context: { ...ctx, overlayContainer: instance } }
  },
)

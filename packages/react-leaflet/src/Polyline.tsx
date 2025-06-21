import {
  createElementObject,
  createPathComponent,
  extendContext,
  type PathProps,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  Polyline as LeafletPolyline,
  type PolylineOptions,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface PolylineProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][]
}

export const Polyline = createPathComponent<LeafletPolyline, PolylineProps>(
  function createPolyline({ positions, ...options }, ctx) {
    const polyline = new LeafletPolyline(positions, options)
    return createElementObject(
      polyline,
      extendContext(ctx, { overlayContainer: polyline }),
    )
  },
  function updatePolyline(layer, props, prevProps) {
    if (props.positions !== prevProps.positions) {
      layer.setLatLngs(props.positions)
    }
  },
)

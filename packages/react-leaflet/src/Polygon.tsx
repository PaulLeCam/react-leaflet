import {
  type PathProps,
  createElementObject,
  createPathComponent,
  extendContext,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  type PolylineOptions,
  Polygon as LeafletPolygon,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface PolygonProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
}

export const Polygon = createPathComponent<LeafletPolygon, PolygonProps>(
  function createPolygon({ positions, ...options }, ctx) {
    const polygon = new LeafletPolygon(positions, options)
    return createElementObject(
      polygon,
      extendContext(ctx, { overlayContainer: polygon }),
    )
  },
  function updatePolygon(layer, props, prevProps) {
    if (props.positions !== prevProps.positions) {
      layer.setLatLngs(props.positions)
    }
  },
)

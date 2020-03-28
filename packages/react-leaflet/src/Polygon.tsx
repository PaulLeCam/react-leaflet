import { PathProps, createPathComponent } from '@react-leaflet/core'
import {
  LatLngExpression,
  PolylineOptions,
  Polygon as LeafletPolygon,
} from 'leaflet'
import { ReactNode } from 'react'

export interface PolygonProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
}

export const Polygon = createPathComponent<LeafletPolygon, PolygonProps>(
  function createPolygon({ positions, ...options }, ctx) {
    const instance = new LeafletPolygon(positions, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
)

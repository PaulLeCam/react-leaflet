import { LatLngExpression, PolylineOptions, Polygon } from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface PolygonProps extends PolylineOptions, PathProps {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
}

export const usePolygonElement = createUseLeafletElement<Polygon, PolygonProps>(
  function createPolygon({ positions, ...options }, ctx) {
    const instance = new Polygon(positions, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
)

export const useLeafletPolygon = createUseLeafletPath(usePolygonElement)

export const LeafletPolygon = createContainerComponent(useLeafletPolygon)

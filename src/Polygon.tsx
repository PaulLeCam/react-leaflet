import { LatLngExpression, PolylineOptions, Polygon } from 'leaflet'
import { ReactNode } from 'react'

import { createContextComponent } from './component'
import { createUseLeafletElement } from './element'
import { createUseLeafletPath } from './path'

export interface PolygonProps extends PolylineOptions {
  children?: ReactNode
  positions: LatLngExpression[] | LatLngExpression[][] | LatLngExpression[][][]
}

export const usePolygonElement = createUseLeafletElement<Polygon, PolygonProps>(
  function createPolygon(props, context) {
    const { positions, ...options } = props
    const el = new Polygon(positions, options)
    return {
      el,
      context: context === null ? null : { ...context, overlayContainer: el },
    }
  },
)

export const useLeafletPolygon = createUseLeafletPath(usePolygonElement)

export const LeafletPolygon = createContextComponent(useLeafletPolygon)

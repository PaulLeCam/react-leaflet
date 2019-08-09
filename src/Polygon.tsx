import { LatLngExpression, PolylineOptions, Polygon } from 'leaflet'
import { ReactNode } from 'react'

import { createContextComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletPath } from './core/path'

export interface PolygonProps extends PolylineOptions, EventedProps {
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

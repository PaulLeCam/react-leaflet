import {
  type PathProps,
  createElementObject,
  createPathComponent,
  extendContext,
} from '@react-leaflet/core'
import {
  type LatLngBoundsExpression,
  Rectangle as LeafletRectangle,
  type PathOptions,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface RectangleProps extends PathOptions, PathProps {
  bounds: LatLngBoundsExpression
  children?: ReactNode
}

export const Rectangle = createPathComponent<LeafletRectangle, RectangleProps>(
  function createRectangle({ bounds, ...options }, ctx) {
    const rectangle = new LeafletRectangle(bounds, options)
    return createElementObject(
      rectangle,
      extendContext(ctx, { overlayContainer: rectangle }),
    )
  },
  function updateRectangle(layer, props, prevProps) {
    if (props.bounds !== prevProps.bounds) {
      layer.setBounds(props.bounds)
    }
  },
)

import { LatLngBoundsExpression, Rectangle, PathOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContextComponent } from './component'
import { createUseLeafletElement } from './element'
import { createUseLeafletPath } from './path'

export interface RectangleProps extends PathOptions {
  bounds: LatLngBoundsExpression
  children?: ReactNode
}

export const useRectangleElement = createUseLeafletElement<
  Rectangle,
  RectangleProps
>(
  function createRectangle(props, context) {
    const { bounds, ...options } = props
    const el = new Rectangle(bounds, options)
    return {
      el,
      context: context === null ? null : { ...context, overlayContainer: el },
    }
  },
  function updateRectangle(el, props, prevProps) {
    if (props.bounds !== prevProps.bounds) {
      el.setBounds(props.bounds)
    }
  },
)

export const useLeafletRectangle = createUseLeafletPath(useRectangleElement)

export const LeafletRectangle = createContextComponent(useLeafletRectangle)

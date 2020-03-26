import { LatLngBoundsExpression, Rectangle, PathOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface RectangleProps extends PathOptions, PathProps {
  bounds: LatLngBoundsExpression
  children?: ReactNode
}

export const useRectangleElement = createUseLeafletElement<
  Rectangle,
  RectangleProps
>(
  function createRectangle({ bounds, ...options }, ctx) {
    const instance = new Rectangle(bounds, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
  function updateRectangle(layer, props, prevProps) {
    if (props.bounds !== prevProps.bounds) {
      layer.setBounds(props.bounds)
    }
  },
)

export const useLeafletRectangle = createUseLeafletPath(useRectangleElement)

export const LeafletRectangle = createContainerComponent(useLeafletRectangle)

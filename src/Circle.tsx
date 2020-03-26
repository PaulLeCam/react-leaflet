import { Circle } from 'leaflet'

import { CircleMarkerProps, updateCircle } from './CircleMarker'
import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface CircleProps extends CircleMarkerProps, PathProps {}

export const useCircleElement = createUseLeafletElement<Circle, CircleProps>(
  function createCircle({ center, children: _c, ...options }, ctx) {
    const instance = new Circle(center, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
  updateCircle,
)

export const useLeafletCircle = createUseLeafletPath(useCircleElement)

export const LeafletCircle = createContainerComponent(useLeafletCircle)

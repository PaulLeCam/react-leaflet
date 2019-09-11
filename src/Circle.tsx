import { Circle } from 'leaflet'

import { CircleMarkerProps, updateCircle } from './CircleMarker'
import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { PathProps, createUseLeafletPath } from './core/path'

export interface CircleProps extends CircleMarkerProps, PathProps {}

export const useCircleElement = createUseLeafletElement<Circle, CircleProps>(
  function createCircle(props, context) {
    const { center, ...options } = props
    const el = new Circle(center, options)
    return {
      el,
      context: context === null ? null : { ...context, overlayContainer: el },
    }
  },
  updateCircle,
)

export const useLeafletCircle = createUseLeafletPath(useCircleElement)

export const LeafletCircle = createContainerComponent(useLeafletCircle)

import { Circle } from 'leaflet'

import { CircleMarkerProps, updateCircle } from './CircleMarker'
import { createContextComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletPath } from './core/path'

export interface CircleProps extends CircleMarkerProps, EventedProps {}

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

export const LeafletCircle = createContextComponent(useLeafletCircle)

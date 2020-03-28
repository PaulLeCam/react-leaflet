import { PathProps, createPathComponent } from '@react-leaflet/core'
import { Circle as LeafletCircle } from 'leaflet'

import { CircleMarkerProps, updateCircle } from './CircleMarker'

export interface CircleProps extends CircleMarkerProps, PathProps {}

export const Circle = createPathComponent<LeafletCircle, CircleProps>(
  function createCircle({ center, children: _c, ...options }, ctx) {
    const instance = new LeafletCircle(center, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
  updateCircle,
)

import { createPathComponent, updateCircle } from '@react-leaflet/core'
import type { CircleMarkerProps } from '@react-leaflet/core'
import { CircleMarker as LeafletCircleMarker } from 'leaflet'

export type { CircleMarkerProps } from '@react-leaflet/core'

export const CircleMarker = createPathComponent<
  LeafletCircleMarker,
  CircleMarkerProps
>(function createCircleMarker({ center, children: _c, ...options }, ctx) {
  const instance = new LeafletCircleMarker(center, options)
  return { instance, context: { ...ctx, overlayContainer: instance } }
}, updateCircle)

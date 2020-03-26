import { LatLngExpression, Marker, MarkerOptions } from 'leaflet'
import { ReactNode } from 'react'

import { createContainerComponent } from './core/component'
import { createUseLeafletElement } from './core/element'
import { EventedProps } from './core/events'
import { createUseLeafletLayer } from './core/layer'

export interface MarkerProps extends MarkerOptions, EventedProps {
  children?: ReactNode
  position: LatLngExpression
}

export const useMarkerElement = createUseLeafletElement<Marker, MarkerProps>(
  function createMarker({ position, ...options }, ctx) {
    const instance = new Marker(position, options)
    const context = ctx === null ? null : { ...ctx, overlayContainer: instance }
    return { instance, context }
  },
  function updateMarker(marker, props, prevProps) {
    if (props.position !== prevProps.position) {
      marker.setLatLng(props.position)
    }
    if (props.icon != null && props.icon !== prevProps.icon) {
      marker.setIcon(props.icon)
    }
    if (
      props.zIndexOffset != null &&
      props.zIndexOffset !== prevProps.zIndexOffset
    ) {
      marker.setZIndexOffset(props.zIndexOffset)
    }
    if (props.opacity != null && props.opacity !== prevProps.opacity) {
      marker.setOpacity(props.opacity)
    }
    if (marker.dragging != null && props.draggable !== prevProps.draggable) {
      if (props.draggable === true) {
        marker.dragging.enable()
      } else {
        marker.dragging.disable()
      }
    }
  },
)

export const useLeafletMarker = createUseLeafletLayer(useMarkerElement)

export const LeafletMarker = createContainerComponent(useLeafletMarker)

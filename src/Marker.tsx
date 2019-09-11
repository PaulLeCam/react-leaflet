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
  function createMarker(props, context) {
    const { position, ...options } = props
    const el = new Marker(position, options)
    return {
      el,
      context: context === null ? null : { ...context, overlayContainer: el },
    }
  },
  function updateMarker(el, props, prevProps) {
    if (props.position !== prevProps.position) {
      el.setLatLng(props.position)
    }
    if (props.icon != null && props.icon !== prevProps.icon) {
      el.setIcon(props.icon)
    }
    if (
      props.zIndexOffset != null &&
      props.zIndexOffset !== prevProps.zIndexOffset
    ) {
      el.setZIndexOffset(props.zIndexOffset)
    }
    if (props.opacity != null && props.opacity !== prevProps.opacity) {
      el.setOpacity(props.opacity)
    }
    if (el.dragging != null && props.draggable !== prevProps.draggable) {
      if (props.draggable === true) {
        el.dragging.enable()
      } else {
        el.dragging.disable()
      }
    }
  },
)

export const useLeafletMarker = createUseLeafletLayer(useMarkerElement)

export const LeafletMarker = createContainerComponent(useLeafletMarker)

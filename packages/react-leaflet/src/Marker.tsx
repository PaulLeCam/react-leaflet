import {
  type EventedProps,
  createElementObject,
  createLayerComponent,
  extendContext,
} from '@react-leaflet/core'
import {
  type LatLngExpression,
  Marker as LeafletMarker,
  type MarkerOptions,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface MarkerProps extends MarkerOptions, EventedProps {
  children?: ReactNode
  position: LatLngExpression
}

export const Marker = createLayerComponent<LeafletMarker, MarkerProps>(
  function createMarker({ position, ...options }, ctx) {
    const marker = new LeafletMarker(position, options)
    return createElementObject(
      marker,
      extendContext(ctx, { overlayContainer: marker }),
    )
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
    if (props.interactive != null && props.interactive !== prevProps.interactive) {
      marker.options.interactive = props.interactive;
      if (props.interactive === true) {
        DomUtil.addClass(marker._icon, 'leaflet-interactive');
        marker.addInteractiveTarget(marker._icon);
      } else {
        DomUtil.removeClass(marker._icon, 'leaflet-interactive');
        marker.removeInteractiveTarget(marker._icon);
      }
    }
  },
)

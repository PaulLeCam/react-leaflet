import {
  type EventedProps,
  createElementObject,
  createLayerComponent,
  extendContext,
} from '@react-leaflet/core'
import {
  LatLng,
  type LatLngExpression,
  type LatLngLiteral,
  type LatLngTuple,
  Marker as LeafletMarker,
  type MarkerOptions,
} from 'leaflet'
import type { ReactNode } from 'react'

export interface MarkerProps extends MarkerOptions, EventedProps {
  children?: ReactNode
  position: LatLngExpression
}

function arraysEqual(arr1: LatLngTuple, arr2: LatLngTuple) {
  return arr1.every((value, index) => value === arr2[index])
}

function objectsEqual(obj1: LatLngLiteral, obj2: LatLngLiteral) {
  return Object.keys(obj1).every(
    (key) =>
      obj1[key as keyof LatLngLiteral] === obj2[key as keyof LatLngLiteral],
  )
}

function handlePositionUpdate(
  marker: LeafletMarker,
  props: MarkerProps,
  prevProps: MarkerProps,
) {
  if (
    props.position instanceof LatLng &&
    !props.position.equals(prevProps.position)
  ) {
    return marker.setLatLng(props.position)
  }

  if (
    Array.isArray(props.position) &&
    !arraysEqual(props.position, prevProps.position as LatLngTuple)
  ) {
    return marker.setLatLng(props.position)
  }

  // if position is not a LatLng or LatLngTuple, it must be the LatLngLiteral object
  if (
    !objectsEqual(
      props.position as LatLngLiteral,
      prevProps.position as LatLngLiteral,
    )
  ) {
    return marker.setLatLng(props.position)
  }
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
    handlePositionUpdate(marker, props, prevProps)

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

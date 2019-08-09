import {
  FitBoundsOptions,
  LatLngBoundsExpression,
  Map,
  MapOptions,
} from 'leaflet'
import React, {
  MutableRefObject,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { LeafletProvider } from './core/context'
import { EventedProps, useLeafletEvents } from './core/events'

export interface MapProps extends MapOptions, EventedProps {
  animate?: boolean
  bounds?: LatLngBoundsExpression
  boundsOptions?: FitBoundsOptions
  children?: ReactNode
  useFlyTo?: boolean
}

export function useMapElement(
  mapRef: MutableRefObject<HTMLElement | null>,
  props: MapProps,
): Map | null {
  const propsRef = useRef<MapProps>(props)
  const [map, setMap] = useState<Map | null>(null)

  useLeafletEvents(map ? { el: map } : null, props.eventHandlers)
  useEffect(() => {
    if (mapRef.current === null) {
      // Wait for map container to be rendered
      return
    }
    if (map === null) {
      const el = new Map(mapRef.current, props)
      if (props.center != null && props.zoom != null) {
        el.setView(props.center, props.zoom)
      } else if (props.bounds != null) {
        el.fitBounds(props.bounds)
      }
      setMap(el)
    } else if (propsRef.current !== null) {
      if (
        props.center != null &&
        props.zoom != null &&
        (props.center !== propsRef.current.center ||
          props.zoom !== propsRef.current.zoom)
      ) {
        const opts = { animate: props.animate || false }
        if (props.useFlyTo === true) {
          map.flyTo(props.center, props.zoom, opts)
        } else {
          map.setView(props.center, props.zoom, opts)
        }
      }

      if (props.bounds != null && props.bounds !== propsRef.current.bounds) {
        if (props.useFlyTo) {
          map.flyToBounds(props.bounds, props.boundsOptions)
        } else {
          map.fitBounds(props.bounds, props.boundsOptions)
        }
      }
    }
    propsRef.current = props
  })

  return map
}

function LeafletMapComponent(
  { children, ...options }: MapProps,
  ref: Ref<{ element: Map | null }>,
) {
  const mapRef = useRef<HTMLDivElement>(null)
  const map = useMapElement(mapRef, options)

  useImperativeHandle(ref, () => ({ element: map }))

  const contents = map ? (
    <LeafletProvider value={{ map }}>{children}</LeafletProvider>
  ) : null
  return <div ref={mapRef}>{contents}</div>
}

export const LeafletMap = forwardRef(LeafletMapComponent)

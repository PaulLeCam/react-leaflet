import { Map, MapOptions } from 'leaflet'
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

import { LeafletProvider } from './context'
import { useLeafletEvents } from './events'

export interface MapProps extends MapOptions {
  children?: ReactNode
}

export function useMapElement(
  mapRef: MutableRefObject<HTMLElement | null>,
  options: MapOptions,
): Map | null {
  const optionsRef = useRef<MapOptions>(options)
  const [map, setMap] = useState<Map | null>(null)

  useLeafletEvents(map ? { el: map } : null, options)
  useEffect(() => {
    if (mapRef.current === null) {
      // Wait for map container to be rendered
      return
    }
    if (map === null) {
      const el = new Map(mapRef.current)
      if (options.center != null && options.zoom != null) {
        el.setView(options.center, options.zoom)
      }
      setMap(el)
    } else if (optionsRef.current !== null) {
      if (
        options.center != null &&
        options.zoom != null &&
        (options.center !== optionsRef.current.center ||
          options.zoom !== optionsRef.current.zoom)
      ) {
        map.setView(options.center, options.zoom)
      }
    }
    optionsRef.current = options
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

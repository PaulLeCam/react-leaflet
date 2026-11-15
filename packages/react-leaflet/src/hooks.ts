import { useLeafletContext } from '@react-leaflet/core'
import type { LeafletMap, MapListeners } from 'leaflet'
import { useEffect } from 'react'

export function useMap(): LeafletMap {
  return useLeafletContext().map
}

export function useMapEvent<T extends keyof MapListeners>(
  type: T,
  handler: MapListeners[T],
): LeafletMap {
  const map = useMap()

  useEffect(
    function addMapEventHandler() {
      // @ts-expect-error event type
      map.on(type, handler)

      return function removeMapEventHandler() {
        map.off(type, handler)
      }
    },
    [map, type, handler],
  )

  return map
}

export function useMapEvents(handlers: MapListeners): LeafletMap {
  const map = useMap()

  useEffect(
    function addMapEventHandlers() {
      map.on(handlers)

      return function removeMapEventHandlers() {
        map.off(handlers)
      }
    },
    [map, handlers],
  )

  return map
}

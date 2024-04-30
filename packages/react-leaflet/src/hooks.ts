import { useLeafletContext } from '@react-leaflet/core'
import type { LeafletEventHandlerFnMap, Map } from 'leaflet'
import { useEffect } from 'react'

export function useMap(): Map {
  return useLeafletContext().map
}

export function useMapEvent<T extends keyof LeafletEventHandlerFnMap>(
  type: T,
  handler: LeafletEventHandlerFnMap[T],
): Map {
  const map = useMap()

  useEffect(
    function addMapEventHandler() {
      // @ts-ignore event type
      map.on(type, handler)

      return function removeMapEventHandler() {
        // @ts-ignore event type
        map.off(type, handler)
      }
    },
    [map, type, handler],
  )

  return map
}

export function useMapEvents(handlers: LeafletEventHandlerFnMap): Map {
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

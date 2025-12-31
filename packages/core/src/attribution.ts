import type { Map as LeafletMap } from 'leaflet'
import { useLayoutEffect, useRef } from 'react'

export function useAttribution(
  map: LeafletMap,
  attribution: string | null | undefined,
) {
  const attributionRef = useRef(attribution)

  useLayoutEffect(
    function updateAttribution() {
      if (
        attribution !== attributionRef.current &&
        map.attributionControl != null
      ) {
        if (attributionRef.current != null) {
          map.attributionControl.removeAttribution(attributionRef.current)
        }
        if (attribution != null) {
          map.attributionControl.addAttribution(attribution)
        }
      }
      attributionRef.current = attribution
    },
    [map, attribution],
  )
}

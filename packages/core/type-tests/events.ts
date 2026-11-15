import type { Marker, MarkerEventMap } from 'leaflet'

import type { LeafletElement } from '../src/element.js'
import { type EventHandlers, useEventHandlers } from '../src/events.js'

export function useMarkerEventHandlers(element: LeafletElement<Marker>) {
  const handlers: EventHandlers<MarkerEventMap, Marker> = {
    dragend(event) {
      const marker: Marker = event.target
      marker.setLatLng([event.distance, 0])
    },
    // @ts-expect-error Unknown events must be rejected.
    unknownEvent() {},
  }
  useEventHandlers(element, handlers)
}

export function useInlineMarkerEventHandlers(element: LeafletElement<Marker>) {
  useEventHandlers(element, {
    dragend(event) {
      const marker: Marker = event.target
      marker.setLatLng([event.distance, 0])
    },
    // @ts-expect-error Unknown events must be rejected for inline handlers.
    unknownEvent() {},
  })
}

import type { Evented, LeafletEventHandlerFnMap } from 'leaflet'
import { useEffect, useRef } from 'react'

import type { LeafletElement } from './element.js'

export type EventedProps = {
  eventHandlers?: LeafletEventHandlerFnMap
}

export function useEventHandlers(
  element: LeafletElement<Evented>,
  eventHandlers: LeafletEventHandlerFnMap | null | undefined,
) {
  const eventHandlersRef = useRef<LeafletEventHandlerFnMap | null | undefined>(
    undefined,
  )

  useEffect(
    function addEventHandlers() {
      if (eventHandlers != null) {
        element.instance.on(eventHandlers)
      }
      eventHandlersRef.current = eventHandlers

      return function removeEventHandlers() {
        if (eventHandlersRef.current != null) {
          element.instance.off(eventHandlersRef.current)
        }
        eventHandlersRef.current = null
      }
    },
    [element, eventHandlers],
  )
}

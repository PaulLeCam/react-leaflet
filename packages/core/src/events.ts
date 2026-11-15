import type { Evented, Listener } from 'leaflet'
import { useEffect, useRef } from 'react'

import type { LeafletElement } from './element.js'

export type EventMapOf<T> =
  T extends Evented<infer _O, infer E extends object> ? E : never

export type EventHandlers<E extends object, T = Evented> = {
  [K in keyof E & string]?: Listener<K, E, T>
}

export type EventedProps<T extends Evented> = {
  eventHandlers?: EventHandlers<EventMapOf<T>, T>
}

export function useEventHandlers<
  T extends Evented<object, E>,
  E extends object = EventMapOf<T>,
>(
  element: LeafletElement<T>,
  eventHandlers: EventHandlers<NoInfer<E>, T> | null | undefined,
) {
  const eventHandlersRef = useRef<EventHandlers<E, T> | null | undefined>(
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

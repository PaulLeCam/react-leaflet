import { Evented, LeafletEventHandlerFnMap } from 'leaflet'
import { useEffect, useRef } from 'react'

import { LeafletElement } from './element'

const EVENTS_RE = /^on(.+)$/i

export const extractLeafletEvents = (
  props: Record<string, any>,
): LeafletEventHandlerFnMap => {
  return Object.keys(props).reduce(
    (res, prop) => {
      if (EVENTS_RE.test(prop)) {
        if (props[prop] != null) {
          const key = prop.replace(EVENTS_RE, (_, p) => p.toLowerCase())
          res[key] = props[prop]
        }
      }
      return res
    },
    {} as LeafletEventHandlerFnMap,
  )
}

export const setLeafletEvents = (
  el: Evented,
  next: LeafletEventHandlerFnMap = {},
  prev: LeafletEventHandlerFnMap = {},
): LeafletEventHandlerFnMap => {
  const diff = { ...prev }

  Object.keys(prev).forEach((ev: string) => {
    const cb = prev[ev]
    if (next[ev] == null || cb !== next[ev]) {
      delete diff[ev]
      el.off(ev, cb)
    }
  })

  Object.keys(next).forEach((ev: string) => {
    const cb = next[ev]
    if (prev[ev] == null || cb !== prev[ev]) {
      diff[ev] = cb
      el.on(ev, cb)
    }
  })

  return diff
}

export const useLeafletEvents = (
  element: LeafletElement<Evented> | null,
  props: Record<string, any>,
) => {
  const eventsRef = useRef<LeafletEventHandlerFnMap>({})

  useEffect(() => {
    if (element === null) {
      return
    }
    const events = extractLeafletEvents(props)
    eventsRef.current = setLeafletEvents(element.el, events, eventsRef.current)

    return () => {
      Object.keys(eventsRef.current).forEach((ev: string) => {
        element.el.off(ev, eventsRef.current[ev])
      })
    }
  })
}

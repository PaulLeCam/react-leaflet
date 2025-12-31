import type { Control, ControlOptions } from 'leaflet'
import { useLayoutEffect, useRef } from 'react'

import { useLeafletContext } from './context.js'
import type { ElementHook } from './element.js'

export function createControlHook<E extends Control, P extends ControlOptions>(
  useElement: ElementHook<E, P>,
) {
  return function useLeafletControl(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(props, context)
    const { instance } = elementRef.current
    const positionRef = useRef(props.position)
    const { position } = props

    useLayoutEffect(
      function addControl() {
        instance.addTo(context.map)

        return function removeControl() {
          instance.remove()
        }
      },
      [context.map, instance],
    )

    useLayoutEffect(
      function updateControl() {
        if (position != null && position !== positionRef.current) {
          instance.setPosition(position)
          positionRef.current = position
        }
      },
      [instance, position],
    )

    return elementRef
  }
}

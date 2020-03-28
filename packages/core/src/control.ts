import { Control, ControlOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context'
import { ElementHook } from './element'

export function createControlHook<E extends Control, P extends ControlOptions>(
  useElement: ElementHook<E, P>,
) {
  return function useLeafletControl(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)
    const positionRef = useRef(props.position)

    useEffect(
      function addControl() {
        if (elementRef.current === null || context == null) {
          return
        }

        const { instance } = elementRef.current
        instance.addTo(context.map)

        return function removeControl() {
          instance.remove()
        }
      },
      [context, elementRef],
    )

    useEffect(
      function updateControl() {
        if (
          elementRef.current !== null &&
          props.position != null &&
          props.position !== positionRef.current
        ) {
          elementRef.current.instance.setPosition(props.position)
          positionRef.current = props.position
        }
      },
      [elementRef, props.position],
    )

    return elementRef
  }
}

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
    const { instance } = elementRef.current
    const positionRef = useRef(props.position)

    useEffect(
      function addControl() {
        instance.addTo(context.map)

        return function removeControl() {
          instance.remove()
        }
      },
      [context.map, instance],
    )

    useEffect(
      function updateControl() {
        if (props.position != null && props.position !== positionRef.current) {
          instance.setPosition(props.position)
          positionRef.current = props.position
        }
      },
      [instance, props.position],
    )

    return elementRef
  }
}

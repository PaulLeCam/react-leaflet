import { Control, ControlOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context'
import { UseLeafletElement } from './element'

export function createUseLeafletControl<
  E extends Control,
  P extends ControlOptions
>(useElement: UseLeafletElement<E, P>) {
  return (props: P): ReturnType<UseLeafletElement<E, P>> => {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)
    const positionRef = useRef(props.position)

    // Mounting and unmounting
    useEffect(() => {
      if (elementRef.current === null || context == null) {
        return
      }
      elementRef.current.el.addTo(context.map)
      return () => {
        elementRef.current.el.remove()
      }
    }, [])
    // Update
    useEffect(() => {
      if (
        elementRef.current !== null &&
        props.position != null &&
        props.position !== positionRef.current
      ) {
        elementRef.current.el.setPosition(props.position)
        positionRef.current = props.position
      }
    })

    return elementRef
  }
}

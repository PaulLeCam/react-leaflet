import { FeatureGroup, Path, PathOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context'
import { LeafletElement, UseLeafletElement } from './element'
import { EventedProps, useLeafletEvents } from './events'
import { useLeafletLayerLifecycle } from './layer'

export interface PathProps extends EventedProps {
  pathOptions?: PathOptions
}

export function useLeafletPathOptions<P extends PathProps>(
  element: LeafletElement<FeatureGroup | Path> | null,
  props: P,
) {
  const optionsRef = useRef<PathOptions>(props.pathOptions || {})

  useEffect(() => {
    if (element === null) {
      return
    }

    if (props.pathOptions !== optionsRef.current) {
      const options = props.pathOptions || {}
      element.el.setStyle(options)
      optionsRef.current = options
    }
  }, [element, props])
}

export function createUseLeafletPath<
  E extends FeatureGroup | Path,
  P extends PathProps
>(useElement: UseLeafletElement<E, P>) {
  return function useLeafletPath(
    props: P,
  ): ReturnType<UseLeafletElement<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useLeafletEvents(elementRef.current, props.eventHandlers)
    useLeafletLayerLifecycle(elementRef.current, context)
    useLeafletPathOptions<P>(elementRef.current, props)

    return elementRef
  }
}

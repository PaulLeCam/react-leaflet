import { FeatureGroup, Path, PathOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context'
import { LeafletElement, ElementHook } from './element'
import { EventedProps, useEventHandlers } from './events'
import { useLayerLifecycle } from './layer'

export interface PathProps extends EventedProps {
  pathOptions?: PathOptions
}

export function usePathOptions<P extends PathProps>(
  element: LeafletElement<FeatureGroup | Path> | null,
  props: P,
) {
  const optionsRef = useRef<PathOptions | void>()

  useEffect(
    function updatePathOptions() {
      if (element === null) {
        return
      }

      if (props.pathOptions !== optionsRef.current) {
        const options = props.pathOptions ?? {}
        element.instance.setStyle(options)
        optionsRef.current = options
      }
    },
    [element, props],
  )
}

export function createPathHook<
  E extends FeatureGroup | Path,
  P extends PathProps
>(useElement: ElementHook<E, P>) {
  return function usePath(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useEventHandlers(elementRef.current, props.eventHandlers)
    useLayerLifecycle(elementRef.current, context)
    usePathOptions<P>(elementRef.current, props)

    return elementRef
  }
}

import { FeatureGroup, Path, PathOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context'
import { LeafletElement, ElementHook } from './element'
import { useEventHandlers } from './events'
import { InteractiveLayerProps, useLayerLifecycle } from './layer'

export interface PathProps extends InteractiveLayerProps {
  pathOptions?: PathOptions
}

export function usePathOptions(
  element: LeafletElement<FeatureGroup | Path>,
  props: PathProps,
) {
  const optionsRef = useRef<PathOptions | void>()

  useEffect(
    function updatePathOptions() {
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
    const elementRef = useElement(props, context)

    useEventHandlers(elementRef.current, props.eventHandlers)
    useLayerLifecycle(elementRef.current, context)
    usePathOptions(elementRef.current, props)

    return elementRef
  }
}

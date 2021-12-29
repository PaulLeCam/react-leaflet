import type { FeatureGroup, Path, PathOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context.js'
import type { LeafletElement, ElementHook } from './element.js'
import { useEventHandlers } from './events.js'
import { type InteractiveLayerProps, useLayerLifecycle } from './layer.js'
import { withPane } from './pane.js'

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
  P extends PathProps,
>(useElement: ElementHook<E, P>) {
  return function usePath(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(withPane(props, context), context)

    useEventHandlers(elementRef.current, props.eventHandlers)
    useLayerLifecycle(elementRef.current, context)
    usePathOptions(elementRef.current, props)

    return elementRef
  }
}

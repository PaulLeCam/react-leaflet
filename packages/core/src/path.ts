import type { FeatureGroup, Path, PathOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context.js'
import type { LeafletElement, ElementHook } from './element.js'
import { useEventHandlers } from './events.js'
import { type InteractiveLayerProps, useLayerLifecycle } from './layer.js'
import { withPane } from './pane.js'
import { DomUtil, InteractiveLayerOptions } from 'leaflet'

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

export function usePathInteractive(
  element: LeafletElement<FeatureGroup | Path>,
  props: InteractiveLayerProps,
) {
  const optionsRef = useRef<InteractiveLayerOptions | void>()

  useEffect(
    function updateInteractiveOptions() {
      if (props.interactive !== optionsRef.current) {
        function updateInteractive(elem: HTMLElement) {
          if (props.interactive) {
            DomUtil.addClass(elem, 'leaflet-interactive')
          } else {
            DomUtil.removeClass(elem, 'leaflet-interactive')
          }
        }
        if ('getElement' in element.instance) {
          updateInteractive(element.instance.getElement() as HTMLElement)
        } else if ('getLayers' in element.instance) {
          // Do nothing for now.
        }
      }
    },
    [props, element],
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
    usePathInteractive(elementRef.current, props)

    return elementRef
  }
}

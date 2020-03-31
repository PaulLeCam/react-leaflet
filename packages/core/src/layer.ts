import { Layer } from 'leaflet'
import { useEffect } from 'react'

import { LeafletContextInterface, useLeafletContext } from './context'
import { LeafletElement, ElementHook } from './element'
import { EventedProps, useEventHandlers } from './events'

export function useLayerLifecycle<E extends Layer>(
  element: LeafletElement<E>,
  context: LeafletContextInterface,
) {
  useEffect(
    function addLayer() {
      const container = context.layerContainer ?? context.map
      container.addLayer(element.instance)

      return function removeLayer() {
        container.removeLayer(element.instance)
      }
    },
    [context, element],
  )
}

export function createLayerHook<E extends Layer, P extends EventedProps>(
  useElement: ElementHook<E, P>,
) {
  return function useLayer(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useEventHandlers(elementRef.current, props.eventHandlers)
    useLayerLifecycle(elementRef.current, context)

    return elementRef
  }
}

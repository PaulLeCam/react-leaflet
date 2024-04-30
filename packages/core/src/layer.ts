import type { InteractiveLayerOptions, Layer, LayerOptions } from 'leaflet'
import { useEffect } from 'react'

import { useAttribution } from './attribution.js'
import { type LeafletContextInterface, useLeafletContext } from './context.js'
import type { LeafletElement, ElementHook } from './element.js'
import { type EventedProps, useEventHandlers } from './events.js'
import { withPane } from './pane.js'

export interface LayerProps extends EventedProps, LayerOptions {}
export interface InteractiveLayerProps
  extends LayerProps,
    InteractiveLayerOptions {}

export function useLayerLifecycle(
  element: LeafletElement<Layer>,
  context: LeafletContextInterface,
) {
  useEffect(
    function addLayer() {
      const container = context.layerContainer ?? context.map
      container.addLayer(element.instance)

      return function removeLayer() {
        context.layerContainer?.removeLayer(element.instance)
        context.map.removeLayer(element.instance)
      }
    },
    [context, element],
  )
}

export function createLayerHook<E extends Layer, P extends LayerProps>(
  useElement: ElementHook<E, P>,
) {
  return function useLayer(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(withPane(props, context), context)

    useAttribution(context.map, props.attribution)
    useEventHandlers(elementRef.current, props.eventHandlers)
    useLayerLifecycle(elementRef.current, context)

    return elementRef
  }
}

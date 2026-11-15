import type { InteractiveLayerOptions, Layer, LayerOptions } from 'leaflet'
import { useLayoutEffect } from 'react'

import { useAttribution } from './attribution.js'
import { type LeafletContextInterface, useLeafletContext } from './context.js'
import type { ElementHook, LeafletElement } from './element.js'
import {
  type EventedProps,
  type EventHandlers,
  useEventHandlers,
} from './events.js'
import { withPane } from './pane.js'

export interface LayerProps<T extends Layer = Layer>
  extends EventedProps<T>,
    LayerOptions {}

export type AnyLayerProps = Omit<LayerProps, 'eventHandlers'> & {
  // biome-ignore lint/suspicious/noExplicitAny: variance of handler params requires any
  eventHandlers?: EventHandlers<any, any>
}

export interface InteractiveLayerProps<T extends Layer = Layer>
  extends LayerProps<T>,
    InteractiveLayerOptions {}

export function useLayerLifecycle(
  element: LeafletElement<Layer>,
  context: LeafletContextInterface,
) {
  useLayoutEffect(
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

export function createLayerHook<E extends Layer, P extends AnyLayerProps>(
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

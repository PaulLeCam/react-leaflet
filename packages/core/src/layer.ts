import { Layer, LayerOptions, Map } from 'leaflet'
import { useEffect, useRef } from 'react'

import { LeafletContextInterface, useLeafletContext } from './context'
import { LeafletElement, ElementHook } from './element'
import { EventedProps, useEventHandlers } from './events'

export interface LayerProps extends EventedProps, LayerOptions {}

export function useAttribution(
  map: Map,
  attribution: string | null | undefined,
) {
  const attributionRef = useRef(attribution)

  useEffect(
    function updateAttribution() {
      if (
        attribution !== attributionRef.current &&
        map.attributionControl != null
      ) {
        if (attributionRef.current != null) {
          map.attributionControl.removeAttribution(attributionRef.current)
        }
        if (attribution != null) {
          map.attributionControl.addAttribution(attribution)
        }
      }
      attributionRef.current = attribution
    },
    [map, attribution],
  )
}

export function useLayerLifecycle(
  element: LeafletElement<Layer>,
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

export function createLayerHook<E extends Layer, P extends LayerProps>(
  useElement: ElementHook<E, P>,
) {
  return function useLayer(props: P): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(props, context)

    useAttribution(context.map, props.attribution)
    useEventHandlers(elementRef.current, props.eventHandlers)
    useLayerLifecycle(elementRef.current, context)

    return elementRef
  }
}

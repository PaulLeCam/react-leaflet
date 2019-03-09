import { Layer } from 'leaflet'
import { useEffect } from 'react'

import { useLeafletContext, LeafletContextInterface } from './context'
import { UseLeafletElement, LeafletElement } from './element'
import { useLeafletEvents } from './events'

export function useLeafletLayerLifecycle<E extends Layer>(
  element: LeafletElement<E> | null,
  context: LeafletContextInterface | null | undefined,
) {
  useEffect(() => {
    if (element === null || context == null) {
      return
    }

    const container = context.layerContainer || context.map
    container.addLayer(element.el)

    return () => {
      // @ts-ignore no idea why it complains
      container.removeLayer(element.el)
    }
  }, [context, element])
}

export function createUseLeafletLayer<E extends Layer, P>(
  useElement: UseLeafletElement<E, P>,
) {
  return (props: P): ReturnType<UseLeafletElement<E, P>> => {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useLeafletEvents(elementRef.current, props)
    useLeafletLayerLifecycle(elementRef.current, context)

    return elementRef
  }
}

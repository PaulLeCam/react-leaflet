import { Popup, Tooltip } from 'leaflet'

import { useLeafletContext, LeafletContextInterface } from './context'
import { LeafletElement, ElementHook } from './element'
import { EventedProps, useEventHandlers } from './events'

export type DivOverlay = Popup | Tooltip

export type SetOpenFunc = (open: boolean) => void

export type DivOverlayLifecycleHook<E, P> = (
  element: LeafletElement<E>,
  context: LeafletContextInterface,
  props: P,
  setOpen: SetOpenFunc,
) => void

export type DivOverlayHook<E extends DivOverlay, P> = (
  useElement: ElementHook<E, P>,
  useLifecycle: DivOverlayLifecycleHook<E, P>,
) => (props: P, setOpen: SetOpenFunc) => ReturnType<ElementHook<E, P>>

export function createDivOverlayHook<
  E extends DivOverlay,
  P extends EventedProps
>(useElement: ElementHook<E, P>, useLifecycle: DivOverlayLifecycleHook<E, P>) {
  return function useDivOverlay(
    props: P,
    setOpen: SetOpenFunc,
  ): ReturnType<ElementHook<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useEventHandlers(elementRef.current, props.eventHandlers)
    useLifecycle(elementRef.current, context, props, setOpen)

    return elementRef
  }
}

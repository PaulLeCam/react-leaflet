import { Popup, Tooltip } from 'leaflet'

import { useLeafletContext, LeafletContextInterface } from './context'
import { UseLeafletElement, LeafletElement } from './element'
import { EventedProps, useLeafletEvents } from './events'

export type DivOverlay = Popup | Tooltip

export type SetOpen = (open: boolean) => void

export type UseLifecycle<E, P> = (
  element: LeafletElement<E>,
  context: LeafletContextInterface | null,
  props: P,
  setOpen: SetOpen,
) => void

export type UseLeafletDivOverlay<E extends DivOverlay, P> = (
  useElement: UseLeafletElement<E, P>,
  useLifecycle: UseLifecycle<E, P>,
) => (props: P, setOpen: SetOpen) => ReturnType<UseLeafletElement<E, P>>

export function createUseLeafletDivOverlay<
  E extends DivOverlay,
  P extends EventedProps
>(useElement: UseLeafletElement<E, P>, useLifecycle: UseLifecycle<E, P>) {
  return function useLeafletDivOverlay(
    props: P,
    setOpen: SetOpen,
  ): ReturnType<UseLeafletElement<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useLeafletEvents(elementRef.current, props.eventHandlers)
    useLifecycle(elementRef.current, context, props, setOpen)

    return elementRef
  }
}

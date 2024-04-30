import React, {
  type RefObject,
  type ReactNode,
  type Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { LeafletContext } from './context.js'
import type { DivOverlay, DivOverlayHook } from './div-overlay.js'
import type { LeafletElement } from './element.js'

type ElementHook<E, P> = (props: P) => RefObject<LeafletElement<E>>

export type PropsWithChildren = {
  children?: ReactNode
}

export function createContainerComponent<E, P extends PropsWithChildren>(
  useElement: ElementHook<E, P>,
) {
  function ContainerComponent(props: P, forwardedRef: Ref<E>) {
    const { instance, context } = useElement(props).current
    useImperativeHandle(forwardedRef, () => instance)

    return props.children == null ? null : (
      <LeafletContext value={context}>{props.children}</LeafletContext>
    )
  }

  return forwardRef(ContainerComponent)
}

export function createDivOverlayComponent<
  E extends DivOverlay,
  P extends PropsWithChildren,
>(useElement: ReturnType<DivOverlayHook<E, P>>) {
  function OverlayComponent(props: P, forwardedRef: Ref<E>) {
    const [isOpen, setOpen] = useState(false)
    const { instance } = useElement(props, setOpen).current

    useImperativeHandle(forwardedRef, () => instance)
    // biome-ignore lint/correctness/useExhaustiveDependencies: update overlay when children change
    useEffect(
      function updateOverlay() {
        if (isOpen) {
          instance.update()
        }
      },
      [instance, isOpen, props.children],
    )

    // @ts-ignore _contentNode missing in type definition
    const contentNode = instance._contentNode
    return contentNode ? createPortal(props.children, contentNode) : null
  }

  return forwardRef(OverlayComponent)
}

export function createLeafComponent<E, P>(useElement: ElementHook<E, P>) {
  function LeafComponent(props: P, forwardedRef: Ref<E>) {
    const { instance } = useElement(props).current
    useImperativeHandle(forwardedRef, () => instance)

    return null
  }

  return forwardRef(LeafComponent)
}

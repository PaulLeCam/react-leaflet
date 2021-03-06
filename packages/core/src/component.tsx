import React, {
  MutableRefObject,
  ReactNode,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

import { LeafletProvider } from './context'
import { DivOverlay, DivOverlayHook } from './div-overlay'
import { LeafletElement } from './element'

type ElementHook<E, P> = (props: P) => MutableRefObject<LeafletElement<E>>

export interface PropsWithChildren {
  children?: ReactNode
}

export function createContainerComponent<E, P extends PropsWithChildren>(
  useElement: ElementHook<E, P>,
) {
  function ContainerComponent(props: P, ref: Ref<E>) {
    const { instance, context } = useElement(props).current
    useImperativeHandle(ref, () => instance)

    return props.children == null ? null : (
      <LeafletProvider value={context}>{props.children}</LeafletProvider>
    )
  }

  return forwardRef(ContainerComponent)
}

export function createDivOverlayComponent<
  E extends DivOverlay,
  P extends PropsWithChildren,
>(useElement: ReturnType<DivOverlayHook<E, P>>) {
  function OverlayComponent(props: P, ref: Ref<E>) {
    const [isOpen, setOpen] = useState(false)
    const { instance } = useElement(props, setOpen).current

    useImperativeHandle(ref, () => instance)
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
  function LeafComponent(props: P, ref: Ref<E>) {
    const { instance } = useElement(props).current
    useImperativeHandle(ref, () => instance)

    return null
  }

  return forwardRef(LeafComponent)
}

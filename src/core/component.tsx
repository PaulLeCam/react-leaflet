import React, {
  Fragment,
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
import { DivOverlay, UseLeafletDivOverlay } from './div-overlay'
import { LeafletElement } from './element'

export type UseLeafletFunc<E, P> = (
  props: P,
) => MutableRefObject<LeafletElement<E>>

interface PropsWithChildren {
  children?: ReactNode
}

export type ElementRef<E> = Ref<{ element: E | null }>

export function createContainerComponent<E, P extends PropsWithChildren>(
  useFunc: UseLeafletFunc<E, P>,
) {
  function ContainerComponent(props: P, ref: ElementRef<E>) {
    const elementRef = useFunc(props)

    let instance: E | null = null
    let context = null
    if (elementRef.current !== null) {
      instance = elementRef.current.instance
      context = elementRef.current.context
    }

    useImperativeHandle(ref, () => ({ element: instance }))

    if (props.children == null) {
      return null
    }
    return context == null ? (
      <Fragment>{props.children}</Fragment>
    ) : (
      <LeafletProvider value={context}>{props.children}</LeafletProvider>
    )
  }

  return forwardRef(ContainerComponent)
}

export function createLeafComponent<E, P>(useFunc: UseLeafletFunc<E, P>) {
  function LeafComponent(props: P, ref: ElementRef<E>) {
    const elementRef = useFunc(props)

    useImperativeHandle(ref, () => ({ element: elementRef.current?.instance }))

    return null
  }

  return forwardRef(LeafComponent)
}

export function createOverlayComponent<
  E extends DivOverlay,
  P extends PropsWithChildren
>(useFunc: ReturnType<UseLeafletDivOverlay<E, P>>) {
  function OverlayComponent(props: P, ref: ElementRef<E>) {
    const [isOpen, setOpen] = useState(false)
    const elementRef = useFunc(props, setOpen)
    const instance = elementRef.current?.instance

    useImperativeHandle(ref, () => ({ element: instance }))
    useEffect(() => {
      if (isOpen && instance !== null) {
        instance.update()
      }
    }, [instance, isOpen, props.children])

    // @ts-ignore _contentNode missing in type definition
    const contentNode = instance?._contentNode
    return contentNode ? createPortal(props.children, contentNode) : null
  }

  return forwardRef(OverlayComponent)
}

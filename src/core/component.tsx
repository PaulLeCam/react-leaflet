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

type ElementRef<E> = Ref<{ element: E | null }>

export function createContainerComponent<E, P extends PropsWithChildren>(
  useFunc: UseLeafletFunc<E, P>,
) {
  function ContainerComponent(props: P, ref: ElementRef<E>) {
    const elementRef = useFunc(props)

    let el: E | null = null
    let context = null
    if (elementRef.current !== null) {
      el = elementRef.current.el
      context = elementRef.current.context
    }

    useImperativeHandle(ref, () => ({ element: el }))

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

export function createOverlayComponent<
  E extends DivOverlay,
  P extends PropsWithChildren
>(useFunc: ReturnType<UseLeafletDivOverlay<E, P>>) {
  function OverlayComponent(props: P, ref: ElementRef<E>) {
    const [isOpen, setOpen] = useState(false)
    const elementRef = useFunc(props, setOpen)
    const el = elementRef.current === null ? null : elementRef.current.el

    useImperativeHandle(ref, () => ({ element: el }))
    useEffect(() => {
      if (isOpen && el !== null) {
        el.update()
      }
    }, [el, isOpen, props.children])

    // @ts-ignore _contentNode missing in type definition
    const contentNode = el && el._contentNode
    return contentNode ? createPortal(props.children, contentNode) : null
  }

  return forwardRef(OverlayComponent)
}

export function createLeafComponent<E, P>(useFunc: UseLeafletFunc<E, P>) {
  function LeafComponent(props: P, ref: ElementRef<E>) {
    const elementRef = useFunc(props)
    const el = elementRef.current === null ? null : elementRef.current.el

    useImperativeHandle(ref, () => ({ element: el }))

    return null
  }

  return forwardRef(LeafComponent)
}

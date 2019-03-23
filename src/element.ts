import { MutableRefObject, useEffect, useRef } from 'react'

import { LeafletContextInterface } from './context'

export interface LeafletElement<T> {
  el: T
  context?: LeafletContextInterface | null
}

export type UseLeafletElement<E, P> = (
  context: LeafletContextInterface | null,
  props: P,
) => MutableRefObject<LeafletElement<E>>

export function createUseLeafletElement<E, P>(
  createElement: (
    props: P,
    context: LeafletContextInterface | null,
  ) => LeafletElement<E>,
  updateElement: (el: E, props: P, prevProps: P) => void = () => {},
) {
  return function useLeafletElement(
    context: LeafletContextInterface | null,
    props: P,
  ): ReturnType<UseLeafletElement<E, P>> {
    const elementRef = useRef<LeafletElement<E>>(createElement(props, context))
    const propsRef = useRef<P>(props)

    useEffect(() => {
      if (elementRef.current !== null && propsRef.current !== props) {
        updateElement(elementRef.current.el, props, propsRef.current)
        propsRef.current = props
      }
    }, [props])

    return elementRef
  }
}

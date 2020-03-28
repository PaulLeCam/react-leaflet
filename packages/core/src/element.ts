import { MutableRefObject, useEffect, useRef } from 'react'

import { LeafletContextInterface } from './context'

export type ElementHook<E, P> = (
  context: LeafletContextInterface | null,
  props: P,
) => MutableRefObject<LeafletElement<E>>

export interface LeafletElement<T, C = any> {
  instance: T
  context?: LeafletContextInterface | null
  container?: C | null
}

export function createElementHook<E, P, C = any>(
  createElement: (
    props: P,
    context: LeafletContextInterface | null,
  ) => LeafletElement<E>,
  updateElement?: (instance: E, props: P, prevProps: P) => void,
) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(
      context: LeafletContextInterface | null,
      props: P,
    ): ReturnType<ElementHook<E, P>> {
      return useRef<LeafletElement<E, C>>(createElement(props, context))
    }
  }

  return function useMutableLeafletElement(
    context: LeafletContextInterface | null,
    props: P,
  ): ReturnType<ElementHook<E, P>> {
    const elementRef = useRef<LeafletElement<E, C>>(
      createElement(props, context),
    )
    const propsRef = useRef<P>(props)

    useEffect(
      function updateElementProps() {
        if (elementRef.current !== null && propsRef.current !== props) {
          updateElement(elementRef.current.instance, props, propsRef.current)
          propsRef.current = props
        }
      },
      [props],
    )

    return elementRef
  }
}

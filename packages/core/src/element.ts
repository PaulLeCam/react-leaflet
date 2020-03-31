import { MutableRefObject, useEffect, useRef } from 'react'

import { LeafletContextInterface } from './context'

export type ElementHook<E, P> = (
  context: LeafletContextInterface,
  props: P,
) => MutableRefObject<LeafletElement<E>>

export interface LeafletElement<T, C = any> {
  instance: T
  context: LeafletContextInterface
  container?: C | null
}

export function createElementHook<E, P, C = any>(
  createElement: (
    props: P,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (instance: E, props: P, prevProps: P) => void,
) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(
      context: LeafletContextInterface,
      props: P,
    ): ReturnType<ElementHook<E, P>> {
      return useRef<LeafletElement<E, C>>(createElement(props, context))
    }
  }

  return function useMutableLeafletElement(
    context: LeafletContextInterface,
    props: P,
  ): ReturnType<ElementHook<E, P>> {
    const elementRef = useRef<LeafletElement<E, C>>(
      createElement(props, context),
    )
    const propsRef = useRef<P>(props)
    const { instance } = elementRef.current

    useEffect(
      function updateElementProps() {
        if (propsRef.current !== props) {
          updateElement(instance, props, propsRef.current)
          propsRef.current = props
        }
      },
      [instance, props],
    )

    return elementRef
  }
}

import { type MutableRefObject, useEffect, useRef } from 'react'

import type { LeafletContextInterface } from './context.js'

export type LeafletElement<T, C = any> = Readonly<{
  instance: T
  context: LeafletContextInterface
  container?: C | null
}>

export function createElementObject<T, C = any>(
  instance: T,
  context: LeafletContextInterface,
  container?: C | null,
): LeafletElement<T, C> {
  return Object.freeze({ instance, context, container })
}

export type ElementHook<E, P> = (
  props: P,
  context: LeafletContextInterface,
) => MutableRefObject<LeafletElement<E>>

export function createElementHook<E, P, C = any>(
  createElement: (
    props: P,
    context: LeafletContextInterface,
  ) => LeafletElement<E>,
  updateElement?: (instance: E, props: P, prevProps: P) => void,
) {
  if (updateElement == null) {
    return function useImmutableLeafletElement(
      props: P,
      context: LeafletContextInterface,
    ): ReturnType<ElementHook<E, P>> {
      return useRef<LeafletElement<E, C>>(createElement(props, context))
    }
  }

  return function useMutableLeafletElement(
    props: P,
    context: LeafletContextInterface,
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
      [instance, props, context],
    )

    return elementRef
  }
}

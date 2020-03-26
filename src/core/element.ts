import { MutableRefObject, useEffect, useRef } from 'react'

import { LeafletContextInterface } from './context'

function noop(): void {
  // Intentionally empty
}

export interface LeafletElement<T, C = any> {
  instance: T
  context?: LeafletContextInterface | null
  container?: C | null
}

export type UseLeafletElement<E, P> = (
  context: LeafletContextInterface | null,
  props: P,
) => MutableRefObject<LeafletElement<E>>

export function createUseLeafletElement<E, P, C = any>(
  createElement: (
    props: P,
    context: LeafletContextInterface | null,
  ) => LeafletElement<E>,
  updateElement: (instance: E, props: P, prevProps: P) => void = noop,
) {
  return function useLeafletElement(
    context: LeafletContextInterface | null,
    props: P,
  ): ReturnType<UseLeafletElement<E, P>> {
    const elementRef = useRef<LeafletElement<E, C>>(
      createElement(props, context),
    )
    const propsRef = useRef<P>(props)

    useEffect(() => {
      if (elementRef.current !== null && propsRef.current !== props) {
        updateElement(elementRef.current.instance, props, propsRef.current)
        propsRef.current = props
      }
    }, [props])

    return elementRef
  }
}

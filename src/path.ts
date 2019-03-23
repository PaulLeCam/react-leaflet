import isEqual from 'fast-deep-equal'
import { FeatureGroup, Path, PathOptions } from 'leaflet'
import { useEffect, useRef } from 'react'

import { useLeafletContext } from './context'
import { LeafletElement, UseLeafletElement } from './element'
import { useLeafletEvents } from './events'
import { useLeafletLayerLifecycle } from './layer'

const OPTIONS = [
  'stroke',
  'color',
  'weight',
  'opacity',
  'lineCap',
  'lineJoin',
  'dashArray',
  'dashOffset',
  'fill',
  'fillColor',
  'fillOpacity',
  'fillRule',
  'bubblingMouseEvents',
  'renderer',
  'className',
  // Interactive Layer
  'interactive',
  // Layer
  'pane',
  'attribution',
]

export function getPathOptions(props: Record<string, any>): PathOptions {
  return OPTIONS.reduce(
    (acc, key) => {
      if (props[key] != null) {
        // @ts-ignore
        acc[key] = props[key]
      }
      return acc
    },
    {} as PathOptions,
  )
}

export function useLeafletPathOptions(
  element: LeafletElement<FeatureGroup | Path> | null,
  props: Record<string, any>,
) {
  const optionsRef = useRef<PathOptions>({})

  useEffect(() => {
    if (element === null) {
      return
    }

    const options = getPathOptions(props)
    if (!isEqual(options, optionsRef.current)) {
      element.el.setStyle(options)
      optionsRef.current = options
    }
  }, [element, props])
}

export function createUseLeafletPath<E extends FeatureGroup | Path, P>(
  useElement: UseLeafletElement<E, P>,
) {
  return function useLeafletPath(
    props: P,
  ): ReturnType<UseLeafletElement<E, P>> {
    const context = useLeafletContext()
    const elementRef = useElement(context, props)

    useLeafletEvents(elementRef.current, props)
    useLeafletLayerLifecycle(elementRef.current, context)
    useLeafletPathOptions(elementRef.current, props)

    return elementRef
  }
}

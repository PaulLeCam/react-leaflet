import {
  addClassName,
  LeafletContext,
  type LeafletContextInterface,
  useLeafletContext,
} from '@react-leaflet/core'
import React, {
  type CSSProperties,
  forwardRef,
  type ReactNode,
  type Ref,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react'
import { createPortal } from 'react-dom'

const DEFAULT_PANES = [
  'mapPane',
  'markerPane',
  'overlayPane',
  'popupPane',
  'shadowPane',
  'tilePane',
  'tooltipPane',
]

function omitPane(obj: Record<string, unknown>, pane: string) {
  const { [pane]: _p, ...others } = obj
  return others
}

export interface PaneProps {
  children?: ReactNode
  className?: string
  name: string
  pane?: string
  style?: CSSProperties
}

export type PaneRef = HTMLElement | null

function createPane(
  name: string,
  props: PaneProps,
  context: LeafletContextInterface,
): HTMLElement {
  if (DEFAULT_PANES.indexOf(name) !== -1) {
    throw new Error(
      `You must use a unique name for a pane that is not a default Leaflet pane: ${name}`,
    )
  }
  if (context.map.getPane(name) != null) {
    throw new Error(`A pane with this name already exists: ${name}`)
  }

  const parentPaneName = props.pane ?? context.pane
  const parentPane = parentPaneName
    ? context.map.getPane(parentPaneName)
    : undefined
  const element = context.map.createPane(name, parentPane)

  if (props.className != null) {
    addClassName(element, props.className)
  }
  if (props.style != null) {
    for (const key of Object.keys(props.style)) {
      // @ts-ignore
      element.style[key] = props.style[key]
    }
  }

  return element
}

function PaneComponent(props: PaneProps, forwardedRef: Ref<PaneRef>) {
  const [paneName] = useState(props.name)
  const [paneElement, setPaneElement] = useState<PaneRef>(null)
  useImperativeHandle<PaneRef, PaneRef>(forwardedRef, () => paneElement, [
    paneElement,
  ])
  const context = useLeafletContext()
  // biome-ignore lint/correctness/useExhaustiveDependencies: paneName is immutable
  const newContext = useMemo(() => ({ ...context, pane: paneName }), [context])

  // biome-ignore lint/correctness/useExhaustiveDependencies: lifecycle-only effect
  useEffect(() => {
    setPaneElement(createPane(paneName, props, context))

    return function removeCreatedPane() {
      const pane = context.map.getPane(paneName)
      pane?.remove?.()

      // @ts-ignore map internals
      if (context.map._panes != null) {
        // @ts-ignore map internals
        context.map._panes = omitPane(context.map._panes, paneName)
        // @ts-ignore map internals
        context.map._paneRenderers = omitPane(
          // @ts-ignore map internals
          context.map._paneRenderers,
          paneName,
        )
      }
    }
  }, [])

  return props.children != null && paneElement != null
    ? createPortal(
        <LeafletContext value={newContext}>{props.children}</LeafletContext>,
        paneElement,
      )
    : null
}

export const Pane = forwardRef(PaneComponent)

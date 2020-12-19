import {
  LeafletContextInterface,
  LeafletProvider,
  addClassName,
  useLeafletContext,
} from '@react-leaflet/core'
import React, { CSSProperties, ReactNode, useEffect, useState } from 'react'
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

function createPane(
  props: PaneProps,
  context: LeafletContextInterface,
): HTMLElement {
  const name = props.name

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
    Object.keys(props.style).forEach((key) => {
      // @ts-ignore
      element.style[key] = props.style[key]
    })
  }

  return element
}

export function Pane(props: PaneProps) {
  const context = useLeafletContext()
  const [paneElement] = useState(() => createPane(props, context))
  const [newContext] = useState(() => ({ ...context, pane: props.name }))

  useEffect(() => {
    return function removeCreatedPane() {
      const pane = context.map.getPane(props.name)
      pane?.remove?.()

      // @ts-ignore map internals
      if (context.map._panes != null) {
        // @ts-ignore map internals
        context.map._panes = omitPane(context.map._panes, props.name)
        // @ts-ignore map internals
        context.map._paneRenderers = omitPane(
          // @ts-ignore map internals
          context.map._paneRenderers,
          props.name,
        )
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return props.children != null
    ? createPortal(
        <LeafletProvider value={newContext}>{props.children}</LeafletProvider>,
        paneElement,
      )
    : null
}

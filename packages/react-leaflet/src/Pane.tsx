import {
  LeafletProvider,
  addClassName,
  removeClassName,
  useLeafletContext,
} from '@react-leaflet/core'
import React, {
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from 'react'

const DEFAULT_PANES = [
  'mapPane',
  'markerPane',
  'overlayPane',
  'popupPane',
  'shadowPane',
  'tilePane',
  'tooltipPane',
]

const PANE_STYLES: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

function omitPane(obj: Record<string, unknown>, pane: string) {
  // eslint-disable-next-line @typescript-eslint/camelcase
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

export function Pane(props: PaneProps) {
  const context = useLeafletContext()
  const paneElementRef = useRef<HTMLElement | null>(null)
  const propsRef = useRef<PaneProps>(props)

  function applyStyles(paneElement: HTMLElement) {
    if (props.className != null) {
      addClassName(paneElement, props.className)
    }
    if (props.style != null) {
      Object.keys(props.style).forEach((key) => {
        // @ts-ignore
        paneElement.style[key] = props.style[key]
      })
    }
  }

  function createPane() {
    const name = props.name

    if (DEFAULT_PANES.indexOf(name) !== -1) {
      throw new Error(
        `You must use a unique name for a pane that is not a default Leaflet pane: ${name}`,
      )
    }
    if (context.map.getPane(name) != null) {
      throw new Error(`A pane with this name already exists: ${name}`)
    }

    const parentPane = context.pane
      ? context.map.getPane(context.pane)
      : undefined
    paneElementRef.current = context.map.createPane(name, parentPane)
    applyStyles(paneElementRef.current)
  }

  function removePane(name: string) {
    const pane = context.map.getPane(name)
    pane?.remove?.()

    // @ts-ignore map internals
    if (context.map._panes != null) {
      // @ts-ignore map internals
      context.map._panes = omitPane(context.map._panes, name)
      // @ts-ignore map internals
      context.map._paneRenderers = omitPane(
        // @ts-ignore map internals
        context.map._paneRenderers,
        // @ts-ignore map internals
        name,
      )
    }
  }

  useEffect(function handlePane() {
    if (paneElementRef.current === null) {
      createPane()
    } else if (props !== propsRef.current) {
      if (props.name === propsRef.current.name) {
        // Remove the previous css class name from the pane if it has changed.
        // setStyle() will take care of adding in the updated className
        if (
          propsRef.current.className &&
          props.className !== propsRef.current.className
        ) {
          removeClassName(paneElementRef.current, propsRef.current.className)
        }
        // Update the pane's DOM node style and class
        applyStyles(paneElementRef.current)
      } else {
        removePane(propsRef.current.name)
        createPane()
      }
    }

    return function removeCreatedPane() {
      removePane(props.name)
    }
  })

  const newContext = useMemo(() => ({ ...context, pane: props.name }), [
    context,
    props.name,
  ])

  return props.children ? (
    <LeafletProvider value={newContext}>
      <div style={PANE_STYLES}>{props.children}</div>
    </LeafletProvider>
  ) : null
}

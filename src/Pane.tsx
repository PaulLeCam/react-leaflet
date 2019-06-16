import React, {
  ReactNode,
  useMemo,
  useRef,
  useState,
  CSSProperties,
  useEffect,
} from 'react'
import warning from 'warning'

import { addClassName, removeClassName } from './core/className'
import { LeafletProvider, useLeafletContext } from './core/context'

const LEAFLET_PANES = [
  'tile',
  'shadow',
  'overlay',
  'map',
  'marker',
  'tooltip',
  'popup',
]

const PANE_RE = /-*pane/i

const PANE_STYLES: CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

let idCounter = 0
function uniqueID() {
  return ++idCounter
}

function isLeafletPane(name: string): boolean {
  return LEAFLET_PANES.indexOf(name.replace(PANE_RE, '')) !== -1
}

function omitPane(obj: Record<string, any>, pane: string) {
  // eslint-disable-next-line @typescript-eslint/camelcase
  const { [pane]: _p, ...others } = obj
  return others
}

export interface PaneProps {
  children?: ReactNode
  className?: string
  name?: string
  pane?: string
  style?: Record<string, any>
}

export function LeafletPane(props: PaneProps) {
  const context = useLeafletContext()
  const propsRef = useRef<PaneProps>(props)
  const [paneName, setPaneName] = useState<string | null>(null)

  function setStyle(paneElement: HTMLElement) {
    if (props.className != null || props.style != null) {
      if (props.className != null) {
        addClassName(paneElement, props.className)
      }
      if (props.style != null) {
        Object.keys(props.style).forEach(key => {
          // @ts-ignore
          paneElement.style[key] = props.style[key]
        })
      }
    }
  }

  function createPane() {
    if (context === null) {
      return
    }

    const name = props.name || `pane-${uniqueID()}`
    const isDefault = isLeafletPane(name)
    const existing = isDefault || context.map.getPane(name) != null

    if (existing) {
      const message = isDefault
        ? `You must use a unique name for a pane that is not a default leaflet pane: ${name}`
        : `A pane with this name already exists: ${name}`
      warning(false, message)
    } else {
      const parentPaneName = props.name || context.pane
      const parentPane = parentPaneName
        ? context.map.getPane(parentPaneName)
        : undefined
      context.map.createPane(name, parentPane)
    }

    setPaneName(name)
    const el = context.map.getPane(name)
    if (el != null) {
      setStyle(el)
    }
  }

  function removePane(name: string) {
    if (context !== null) {
      const pane = context.map.getPane(name)
      if (pane != null && pane.remove) pane.remove()

      // @ts-ignore map internals
      if (context.map._panes != null) {
        // @ts-ignore map internals
        context.map._panes = omitPane(context.map._panes, paneName)
        // @ts-ignore map internals
        context.map._paneRenderers = omitPane(
          // @ts-ignore map internals
          context.map._paneRenderers,
          // @ts-ignore map internals
          paneName,
        )
      }
    }
  }

  useEffect(() => {
    if (context !== null) {
      if (paneName === null) {
        createPane()
      } else if (props !== propsRef.current) {
        if (props.name === paneName) {
          const el = context.map.getPane(name)
          if (el != null) {
            // Remove the previous css class name from the pane if it has changed.
            // setStyle() will take care of adding in the updated className
            if (
              propsRef.current.className &&
              props.className !== propsRef.current.className
            ) {
              removeClassName(el, propsRef.current.className)
            }
            // Update the pane's DOM node style and class
            setStyle(el)
          }
        } else {
          removePane(paneName)
          createPane()
        }
      }
    }

    return () => {
      if (paneName !== null) {
        removePane(paneName)
      }
    }
  })

  const newContext = useMemo(() => {
    return context && paneName ? { ...context, pane: paneName } : null
  }, [context, paneName])

  return newContext && props.children ? (
    <LeafletProvider value={newContext}>
      <div style={PANE_STYLES}>{props.children}</div>
    </LeafletProvider>
  ) : null
}

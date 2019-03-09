// @flow
// flowlint sketchy-null-string:off

import React, { Component, type Node } from 'react'
import warning from 'warning'

import { LeafletProvider, withLeaflet } from './context'
import type { LeafletContext } from './types'
import { addClassName, removeClassName } from './utils/updateClassName'
import omit from './utils/omit'

let idCounter = 0
const uniqueId = () => ++idCounter

const LEAFLET_PANES = [
  'tile',
  'shadow',
  'overlay',
  'map',
  'marker',
  'tooltip',
  'popup',
]

const PANE_RE = /-*pane/gi

const isLeafletPane = (name: string): boolean => {
  return LEAFLET_PANES.indexOf(name.replace(PANE_RE, '')) !== -1
}

const paneStyles = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
}

type Props = {
  children: Node,
  className?: string,
  leaflet: LeafletContext,
  name?: string,
  pane?: string,
  style?: Object,
}

type State = {
  name: ?string,
  context: ?LeafletContext,
}

class Pane extends Component<Props, State> {
  state = {
    name: undefined,
    context: undefined,
  }

  componentDidMount() {
    this.createPane(this.props)
  }

  componentDidUpdate(prevProps: Props) {
    if (!this.state.name) {
      // Do nothing if this.state.name is undefined due to errors or
      // an invalid props.name value
      return
    }

    // If the 'name' prop has changed the current pane is unmounted and a new
    // pane is created.
    if (this.props.name !== prevProps.name) {
      this.removePane()
      this.createPane(this.props)
    } else {
      // Remove the previous css class name from the pane if it has changed.
      // setStyle() will take care of adding in the updated className
      if (prevProps.className && this.props.className !== prevProps.className) {
        const pane = this.getPane(this.state.name)
        if (pane != null && prevProps.className != null) {
          removeClassName(pane, prevProps.className)
        }
      }

      // Update the pane's DOM node style and class
      this.setStyle(this.props)
    }
  }

  componentWillUnmount() {
    this.removePane()
  }

  createPane(props: Props) {
    const { map } = props.leaflet
    const name = props.name || `pane-${uniqueId()}`

    if (map != null && map.createPane != null) {
      const isDefault = isLeafletPane(name)
      const existing = isDefault || this.getPane(name)

      if (existing == null) {
        map.createPane(name, this.getParentPane())
      } else {
        const message = isDefault
          ? `You must use a unique name for a pane that is not a default leaflet pane (${name})`
          : `A pane with this name already exists. (${name})`
        warning(false, message)
      }

      this.setState(
        { name, context: { ...props.leaflet, pane: name } },
        this.setStyle,
      )
    }
  }

  removePane() {
    // Remove the created pane
    const { name } = this.state
    if (name != null) {
      const pane = this.getPane(name)
      if (pane != null && pane.remove) pane.remove()

      const { map } = this.props.leaflet
      if (map != null && map._panes != null) {
        map._panes = omit(map._panes, name)
        map._paneRenderers = omit(map._paneRenderers, name)
      }
    }
  }

  setStyle = ({ style, className }: Props = this.props) => {
    const pane = this.getPane(this.state.name)
    if (pane) {
      if (className) {
        addClassName(pane, className)
      }
      if (style) {
        // Without the cast, Flow throws this error:
        //   Cannot assign style[key] to pane.style[key] because string
        //   is incompatible with number.
        Object.keys(style).forEach((key: any) => {
          pane.style[key] = style[key]
        })
      }
    }
  }

  getParentPane(): ?HTMLElement {
    return this.getPane(this.props.pane || this.props.leaflet.pane)
  }

  getPane(name: ?string): ?HTMLElement {
    if (name != null && this.props.leaflet.map != null) {
      return this.props.leaflet.map.getPane(name)
    }
  }

  render() {
    const { context } = this.state
    return context ? (
      <LeafletProvider value={context}>
        <div style={paneStyles}>{this.props.children}</div>
      </LeafletProvider>
    ) : null
  }
}

export default withLeaflet<Props, Pane>(Pane)

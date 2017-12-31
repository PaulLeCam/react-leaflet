// @flow
// flowlint sketchy-null-string:off

import { forEach, omit, uniqueId } from 'lodash'
import type { Map } from 'leaflet'
import React, { Component, type Node } from 'react'
import PropTypes from 'prop-types'
import warning from 'warning'

import children from './propTypes/children'
import map from './propTypes/map'

const LEAFLET_PANES = [
  'tile',
  'shadow',
  'overlay',
  'map',
  'marker',
  'tooltip',
  'popup',
]

const isLeafletPane = (name: string): boolean => {
  return LEAFLET_PANES.indexOf(name.replace(/-*pane/gi, '')) !== -1
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
  map?: Map,
  name?: string,
  pane?: string,
  style?: Object,
}

type State = {
  name: ?string,
}

export default class Pane extends Component<Props, State> {
  static propTypes = {
    name: PropTypes.string,
    children: children,
    map: map,
    className: PropTypes.string,
    style: PropTypes.object,
    pane: PropTypes.string,
  }

  static contextTypes = {
    map: map,
    pane: PropTypes.string,
  }

  static childContextTypes = {
    pane: PropTypes.string,
  }

  state: State = {
    name: undefined,
  }

  getChildContext(): { pane: ?string } {
    return {
      pane: this.state.name,
    }
  }

  componentDidMount() {
    this.createPane(this.props)
  }

  componentWillReceiveProps(nextProps: Props) {
    if (!this.state.name) {
      // Do nothing if this.state.name is undefined due to errors or
      // an invalid props.name value
      return
    }

    // If the 'name' prop has changed the current pane is unmounted and a new
    // pane is created.
    if (nextProps.name !== this.props.name) {
      this.removePane()
      this.createPane(nextProps)
    } else {
      // Remove the previous css class name from the pane if it has changed.
      // setStyle will take care of adding in the updated className
      if (
        this.props.className &&
        nextProps.className !== this.props.className
      ) {
        const pane = this.getPane()
        if (pane && this.props.className)
          pane.classList.remove(this.props.className)
      }

      // Update the pane's DOM node style and class
      this.setStyle(nextProps)
    }
  }

  componentWillUnmount() {
    this.removePane()
  }

  createPane(props: Props) {
    const map = this.context.map
    const name = props.name || `pane-${uniqueId()}`

    if (map && map.createPane) {
      const isDefault = isLeafletPane(name)
      const existing = isDefault || this.getPane(name)

      if (!existing) {
        map.createPane(name, this.getParentPane())
      } else {
        const message = isDefault
          ? `You must use a unique name for a pane that is not a default leaflet pane (${name})`
          : `A pane with this name already exists. (${name})`
        warning(false, message)
      }

      this.setState({ name }, this.setStyle)
    }
  }

  removePane() {
    // Remove the created pane
    const { name } = this.state
    if (name) {
      const pane = this.getPane(name)
      if (pane && pane.remove) pane.remove()

      const map = this.context.map
      if (map && map._panes) {
        map._panes = omit(map._panes, name)
        map._paneRenderers = omit(map._paneRenderers, name)
      }

      this.setState({ name: undefined })
    }
  }

  setStyle = ({ style, className }: Props = this.props) => {
    const pane = this.getPane(this.state.name)
    if (pane) {
      if (className) {
        pane.classList.add(className)
      }
      if (style) {
        forEach(style, (value, key) => {
          pane.style[key] = value
        })
      }
    }
  }

  getParentPane(): ?HTMLElement {
    return this.getPane(this.props.pane || this.context.pane)
  }

  getPane(name: ?string): ?HTMLElement {
    return name ? this.context.map.getPane(name) : undefined
  }

  render() {
    return this.state.name ? (
      <div style={paneStyles}>{this.props.children}</div>
    ) : null
  }
}

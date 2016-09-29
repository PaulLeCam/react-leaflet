/* @flow */
import React, { PropTypes, Component } from 'react'
import { forEach, omit, uniqueId, indexOf } from 'lodash'

import childrenType from './types/children'
import mapType from './types/map'

const BLACKLIST = ['tile', 'shadow', 'overlay', 'map', 'marker', 'tooltip', 'popup']

export default class Pane extends Component {
  static propTypes = {
    name: PropTypes.string,
    children: childrenType,
    map: mapType,
    zIndex: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
    pane: PropTypes.string,
  };

  static contextTypes = {
    map: mapType,
    pane: PropTypes.string,
  };

  static childContextTypes = {
    pane: PropTypes.string,
  };

  constructor () {
    super()

    this.state = {
      name: null,
    }
  }

  getChildContext () {
    return {
      pane: this.state.name,
    }
  }

  componentWillMount () {
    const map = this.context.map || this.props.map

    if (this.state.name && map && map.createPane) {
      const existing = this.getPane()

      if (!existing) {
        map.createPane(this.state.name, this.getParentPane())
      }
    }
  }

  componentWillReceiveProps (props) {
    this.setStyle(props)
  }

  setStyle ({ style, zIndex } = this.props) {
    const pane = this.getPane()

    if (pane) {
      pane.style.zIndex = zIndex || 'initial'

      if (style) {
        forEach(style, (value, key) => {
          pane.style[key] = value
        })
      }
    }
  }

  componentDidMount () {
    this.setState({
      name: this.props.name || `pane-${uniqueId()}`,
    })

    this.setStyle()
  }

  componentWillUnmount () {
    const { name } = this.props

    if (name) {
      const _name = (name + '').replace(/-*pane/gi, '')

      if (indexOf(BLACKLIST, _name) >= 0) {
        // Don't remove panes created by leaflet
        return
      }
    }

    // Remove the created pane
    const pane = this.getPane()
    pane && pane.remove &&
    pane.remove()

    const map = this.context.map || this.props.map

    if (this.state.name && map && map._panes) {
      map._panes = omit(map._panes, this.state.name)
      map._paneRenderers = omit(map._paneRenderers, this.state.name)
    }
  }

  getParentPane () {
    const pane = this.props.pane || this.context.pane

    if (pane) {
      const map = this.context.map || this.props.map

      if (map) {
        return map.getPane(pane) || null
      }
    }

    return null
  }

  getPane () {
    const map = this.context.map || this.props.map

    if (this.state.name && map && map) {
      return map.getPane(this.state.name)
    }

    return null
  }

  getChildren () {
    return React.Children.map(this.props.children, child => {
      if (child.type === Pane) {
        return child
      }

      return child ? React.cloneElement(child, this.props) : null
    })
  }

  render (): any {
    return this.state.name ? (
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}>
        {this.getChildren()}
      </div>
    ) : null
  }
}

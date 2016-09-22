/* @flow */
import React, { PropTypes, Component } from 'react'
import { forEach, omit, uniqueId, indexOf } from 'lodash'

import childrenType from './types/children'
import mapType from './types/map'
import paneType from './types/pane'

const BLACKLIST = ['tile', 'shadow', 'overlay', 'map', 'marker', 'tooltip', 'popup']

export default class MapPane extends Component {
  static propTypes = {
    name: PropTypes.string,
    children: childrenType,
    map: mapType,
    zIndex: PropTypes.number,
    className: PropTypes.string,
    style: PropTypes.object,
  };

  static contextTypes = {
    map: mapType,
  };

  static childContextTypes = {
    pane: paneType,
  };

  constructor ({name}) {
    super()

    this.state = {
      _isMounted: false,
    }

    this._name = name || `pane-${uniqueId()}`
  }

  getChildContext () {
    return {
      pane: this._name,
    }
  }

  componentWillMount () {
    const map = this.context.map || this.props.map

    if (this._name && map && map.createPane) {
      const existing = this.getPane()

      if (!existing) {
        map.createPane(this._name)
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
      _isMounted: true,
    })

    this.setStyle()
  }

  componentWillUnmount () {
    const { name } = this.props

    if (name) {
      const _name = (name + '').replace(/-*pane/gi, '')

      if (indexOf(BLACKLIST, _name)) {
        // Don't remove panes created by leaflet
        return
      }
    }

    // Remove the created pane
    const pane = this.getPane()
    pane && pane.remove &&
    pane.remove()

    const map = this.context.map || this.props.map

    if (this._name && map && map._panes) {
      map._panes = omit(map._panes, this._name)
      map._paneRenderers = omit(map._paneRenderers, this._name)
    }
  }

  getPane () {
    const map = this.context.map || this.props.map

    if (this._name && map && map) {
      return map.getPane(this._name)
    }

    return null
  }

  getChildren () {
    return React.Children.map(this.props.children, child => {
      return child ? React.cloneElement(child, this.props) : null
    })
  }

  render (): any {
    const { _isMounted } = this.state
    return _isMounted ? (
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

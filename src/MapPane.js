/* @flow */
import React, { PropTypes, Component } from 'react'
// import { omit } from 'lodash'

import childrenType from './types/children'
import mapType from './types/map'
import paneType from './types/pane'

export default class MapPane extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: childrenType,
    map: mapType,
    zIndex: PropTypes.number,
  };

  static contextTypes = {
    map: mapType,
  };

  static childContextTypes = {
    pane: paneType,
  };

  constructor () {
    super()

    this.state = {
      _isMounted: false,
    }
  }

  getChildContext () {
    return {
      pane: this.props.name,
    }
  }

  componentWillMount () {
    const { name } = this.props
    const map = this.context.map || this.props.map

    if (name && map && map.createPane) {
      const existing = this.getPane()

      if (!existing) {
        map.createPane(name)
      }
    }
  }

  componentWillReceiveProps ({zIndex}) {
    if (zIndex !== this.props.zIndex) {
      const pane = this.getPane()
      pane.style.zIndex = zIndex || 'initial'
    }
  }

  componentDidMount () {
    this.setState({
      _isMounted: true,
    })

    const pane = this.getPane()
    const { zIndex } = this.props
    if (pane && zIndex != null) {
      pane.style.zIndex = zIndex
    }
  }

  componentWillUnmount () {
    // const pane = this.getPane()
    // pane && pane.remove && pane.remove()
    //
    // const map = this.context.map || this.props.map
    // const { name } = this.props
    //
    // if (name && map && map._panes) {
    //   map._panes = omit(map._panes, name)
    // }
  }

  getPane () {
    const { name } = this.props
    const map = this.context.map || this.props.map

    if (name && map && map) {
      return map.getPane(name)
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
      <div style={{position: 'absolute'}}>
        {this.getChildren()}
      </div>
    ) : null
  }
}

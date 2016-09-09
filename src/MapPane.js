/* @flow */
import { PropTypes } from 'react'

import MapLayer from './MapLayer'

import childrenType from './types/children'
import mapType from './types/map'
import paneType from './types/pane'

export default class MapPane extends MapLayer {
  static propTypes = {
    name: PropTypes.string.isRequired,
    children: childrenType,
    map: mapType,
  };

  static contextTypes = {
    map: mapType,
  };

  static childContextTypes = {
    pane: paneType,
  };

  getChildContext () {
    return {
      pane: this.leafletElement,
    }
  }

  componentWillReceiveProps () {

  }

  componentDidMount () {

  }

  componentWillMount () {
    const { name } = this.props
    const map = this.context.map || this.props.map

    if (name && map && map.createPane) {
      this.leafletElement = map.createPane(name)
    }
  }

  componentWillUnmount () {
    this.leafletElement && this.leafletElement.remove && this.leafletElement.remove()
  }
}

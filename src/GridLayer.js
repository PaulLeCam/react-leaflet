/* @flow */

import { gridLayer } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import MapLayer from './MapLayer'

export default class GridLayer extends MapLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  };

  componentWillMount () {
    super.componentWillMount()
    this.leafletElement = gridLayer(this.getOptions(this.props))
  }

  componentDidUpdate (prevProps: Object) {
    const { opacity, zIndex } = this.props
    if (opacity !== prevProps.opacity) {
      this.leafletElement.setOpacity(opacity)
    }
    if (zIndex !== prevProps.zIndex) {
      this.leafletElement.setZIndex(zIndex)
    }
  }

  render (): null {
    return null
  }
}

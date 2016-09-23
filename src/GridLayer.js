/* @flow */

import { gridLayer } from 'leaflet'
import { PropTypes } from 'react'

import MapLayer from './MapLayer'

export default class GridLayer extends MapLayer {
  static propTypes = {
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  };

  componentWillMount () {
    super.componentWillMount()
    this.leafletElement = gridLayer(this.getInstanceOptions(this.props))
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

  render () {
    return null
  }
}

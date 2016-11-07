/* @flow */

import { PropTypes } from 'react'

import childrenType from './types/children'
import MapLayer from './MapLayer'

export default class BaseTileLayer extends MapLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    zIndex: PropTypes.number,
  };

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

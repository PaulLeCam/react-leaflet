// @flow

import { isEqual, pick } from 'lodash'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'

import MapLayer from './MapLayer'

const OPTIONS = [
  'stroke',
  'color',
  'weight',
  'opacity',
  'fill',
  'fillColor',
  'fillOpacity',
  'fillRule',
  'dashArray',
  'lineCap',
  'lineJoin',
  'clickable',
  'pointerEvents',
  'className',
]

export default class Path extends MapLayer {
  static childContextTypes = {
    children: childrenType,
    popupContainer: PropTypes.object,
  }

  componentDidUpdate(prevProps: Object) {
    super.componentDidUpdate(prevProps)
    this.setStyleIfChanged(prevProps, this.props)
  }

  getChildContext(): { popupContainer: Object } {
    return {
      popupContainer: this.leafletElement,
    }
  }

  getPathOptions(props: Object): Object {
    return pick(props, OPTIONS)
  }

  setStyle(options: Object = {}) {
    this.leafletElement.setStyle(options)
  }

  setStyleIfChanged(fromProps: Object, toProps: Object) {
    const nextStyle = this.getPathOptions(toProps)
    if (!isEqual(nextStyle, this.getPathOptions(fromProps))) {
      this.setStyle(nextStyle)
    }
  }
}

// @flow

import type { Path as PathType } from 'leaflet'
import { isEqual, pick } from 'lodash'

import MapLayer from './MapLayer'
import children from './propTypes/children'
import layer from './propTypes/layer'
import type { PathOptions, PathProps } from './types'

const OPTIONS = [
  'stroke',
  'color',
  'weight',
  'opacity',
  'lineCap',
  'lineJoin',
  'dashArray',
  'dashOffset',
  'fill',
  'fillColor',
  'fillOpacity',
  'fillRule',
  'bubblingMouseEvents',
  'renderer',
  'className',
  // Interactive Layer
  'interactive',
  // Layer
  'pane',
  'attribution',
]

export default class Path<
  LeafletElement: PathType,
  Props: PathProps,
> extends MapLayer<LeafletElement, Props> {
  static childContextTypes = {
    children: children,
    popupContainer: layer,
  }

  leafletElement: LeafletElement

  componentDidUpdate(prevProps: Props) {
    super.componentDidUpdate(prevProps)
    this.setStyleIfChanged(prevProps, this.props)
  }

  getChildContext(): { popupContainer: LeafletElement } {
    return {
      popupContainer: this.leafletElement,
    }
  }

  getPathOptions(props: Props): PathOptions {
    return pick(props, OPTIONS)
  }

  setStyle(options: PathOptions = {}) {
    this.leafletElement.setStyle(options)
  }

  setStyleIfChanged(fromProps: Props, toProps: Props) {
    const nextStyle = this.getPathOptions(toProps)
    if (!isEqual(nextStyle, this.getPathOptions(fromProps))) {
      this.setStyle(nextStyle)
    }
  }
}

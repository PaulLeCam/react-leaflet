// @flow

import type { Path as PathType } from 'leaflet'
import isEqual from 'fast-deep-equal'

import MapLayer from './MapLayer'
import type { PathOptions, PathProps } from './types'
import pick from './utils/pick'

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
  constructor(props: Props) {
    super(props)
    if (this.contextValue == null) {
      this.contextValue = {
        ...props.leaflet,
        popupContainer: this.leafletElement,
      }
    }
  }

  componentDidUpdate(prevProps: Props) {
    super.componentDidUpdate(prevProps)
    this.setStyleIfChanged(prevProps, this.props)
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

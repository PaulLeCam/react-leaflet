// @flow

import { Rectangle as LeafletRectangle } from 'leaflet'

import Path from './Path'
import bounds from './propTypes/bounds'
import children from './propTypes/children'
import type { LatLngBounds, PathProps } from './types'

type LeafletElement = LeafletRectangle
type Props = { bounds: LatLngBounds } & PathProps

export default class Rectangle extends Path<LeafletElement, Props> {
  static propTypes = {
    children: children,
    bounds: bounds.isRequired,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletRectangle(props.bounds, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.bounds !== fromProps.bounds) {
      this.leafletElement.setBounds(toProps.bounds)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

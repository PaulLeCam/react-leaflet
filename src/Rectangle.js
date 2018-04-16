// @flow

import { Rectangle as LeafletRectangle } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { LatLngBounds, PathProps } from './types'

type LeafletElement = LeafletRectangle
type Props = { bounds: LatLngBounds } & PathProps

class Rectangle extends Path<LeafletElement, Props> {
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

export default withLeaflet(Rectangle)

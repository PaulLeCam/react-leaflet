// @flow

import { Circle as LeafletCircle } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { LatLng, MapLayerProps, PathOptions } from './types'

type LeafletElement = LeafletCircle
type Props = {
  center: LatLng,
  radius: number,
} & MapLayerProps &
  PathOptions &
  Object

class Circle extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const { center, radius, ...options } = props
    return new LeafletCircle(center, radius, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center)
    }
    if (toProps.radius !== fromProps.radius) {
      this.leafletElement.setRadius(toProps.radius)
    }
  }
}

export default withLeaflet<Props, Circle>(Circle)

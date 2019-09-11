// @flow

import { Polygon as LeafletPolygon } from 'leaflet'
import isEqual from 'fast-deep-equal'

import { withLeaflet } from './context'
import Path from './Path'
import type { LatLng, PathProps } from './types'

type LeafletElement = LeafletPolygon
type Props = {
  positions: LatLng[] | LatLng[][] | LatLng[][][],
} & PathProps

class Polygon extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletPolygon(props.positions, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (!isEqual(toProps.positions, fromProps.positions)) {
      this.leafletElement.setLatLngs(toProps.positions)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

export default withLeaflet<Props, Polygon>(Polygon)

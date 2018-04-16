// @flow

import { Polyline as LeafletPolyline } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { LatLng, PathProps } from './types'

type LeafletElement = LeafletPolyline
type Props = {
  positions: LatLng[] | LatLng[][],
} & PathProps

class Polyline extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    return new LeafletPolyline(props.positions, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

export default withLeaflet(Polyline)

// @flow

import { CircleMarker as LeafletCircleMarker } from 'leaflet'

import { withLeaflet } from './context'
import Path from './Path'
import type { LatLng, PathProps } from './types'

type LeafletElement = LeafletCircleMarker
type Props = {
  center: LatLng,
  radius: number,
} & PathProps

class CircleMarker extends Path<LeafletElement, Props> {
  createLeafletElement(props: Props): LeafletElement {
    const el = new LeafletCircleMarker(props.center, this.getOptions(props))
    this.contextValue = { ...props.leaflet, popupContainer: el }
    return el
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

export default withLeaflet(CircleMarker)

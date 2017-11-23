// @flow

import { CircleMarker as LeafletCircleMarker, type Layer } from 'leaflet'
import PropTypes from 'prop-types'

import Path from './Path'
import children from './propTypes/children'
import latlng from './propTypes/latlng'
import layer from './propTypes/layer'
import type { LatLng, PathProps } from './types'

type LeafletElement = LeafletCircleMarker
type Props = {
  center: LatLng,
  radius: number,
} & PathProps

export default class CircleMarker extends Path<LeafletElement, Props> {
  static propTypes = {
    center: latlng.isRequired,
    children: children,
    radius: PropTypes.number,
  }

  static childContextTypes = {
    popupContainer: layer,
  }

  getChildContext(): { popupContainer: Layer } {
    return {
      popupContainer: this.leafletElement,
    }
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletCircleMarker(props.center, this.getOptions(props))
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

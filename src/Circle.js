// @flow

import { Circle as LeafletCircle } from 'leaflet'
import PropTypes from 'prop-types'

import Path from './Path'
import children from './propTypes/children'
import latlng from './propTypes/latlng'
import type { LatLng, MapLayerProps, PathOptions } from './types'

type LeafletElement = LeafletCircle
type Props = {
  center: LatLng,
  radius: number,
} & MapLayerProps &
  PathOptions &
  Object

export default class Circle extends Path<LeafletElement, Props> {
  static propTypes = {
    center: latlng.isRequired,
    children: children,
    radius: PropTypes.number.isRequired,
  }

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

// @flow

import { Polyline as LeafletPolyline } from 'leaflet'
import PropTypes from 'prop-types'

import Path from './Path'
import children from './propTypes/children'
import latlngList from './propTypes/latlngList'
import type { LatLng, PathProps } from './types'

type LeafletElement = LeafletPolyline
type Props = {
  positions: LatLng[] | LatLng[][],
} & PathProps

export default class Polyline extends Path<LeafletElement, Props> {
  static propTypes = {
    children: children,
    positions: PropTypes.oneOfType([latlngList, PropTypes.arrayOf(latlngList)])
      .isRequired,
  }

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

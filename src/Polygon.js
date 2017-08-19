// @flow

import { Polygon as LeafletPolygon } from 'leaflet'
import PropTypes from 'prop-types'

import Path from './Path'
import children from './propTypes/children'
import latlngList from './propTypes/latlngList'
import type { LatLng, PathProps } from './types'

const multiLatLngList = PropTypes.arrayOf(latlngList)

type LeafletElement = LeafletPolygon
type Props = {
  positions: LatLng[] | LatLng[][] | LatLng[][][],
} & PathProps

export default class Polygon extends Path<LeafletElement, Props> {
  static propTypes = {
    children: children,
    positions: PropTypes.oneOfType([
      latlngList,
      multiLatLngList,
      PropTypes.arrayOf(multiLatLngList),
    ]).isRequired,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletPolygon(props.positions, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (toProps.positions !== fromProps.positions) {
      this.leafletElement.setLatLngs(toProps.positions)
    }
    this.setStyleIfChanged(fromProps, toProps)
  }
}

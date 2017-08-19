// @flow

import { GeoJSON as LeafletGeoJSON, type LatLng, type Layer } from 'leaflet'
import { isFunction } from 'lodash'
import PropTypes from 'prop-types'

import Path from './Path'
import children from './propTypes/children'
import type { PathProps } from './types'

type LeafletElement = LeafletGeoJSON

type GeoJSONdata = Object | Array<any>

type Props = {
  data: GeoJSONdata,
  pointToLayer?: (point: GeoJSONdata, latlng: LatLng) => Layer,
  style?: (feature: GeoJSONdata) => Object,
  onEachFeature?: (feature: GeoJSONdata, layer: Layer) => void,
  filter?: (feature: GeoJSONdata) => boolean,
  coordsToLatLng?: (coords: GeoJSONdata) => LatLng,
} & PathProps

export default class GeoJSON extends Path<LeafletElement, Props> {
  static propTypes = {
    children: children,
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
  }

  createLeafletElement(props: Props): LeafletElement {
    return new LeafletGeoJSON(props.data, this.getOptions(props))
  }

  updateLeafletElement(fromProps: Props, toProps: Props) {
    if (isFunction(toProps.style)) {
      this.setStyle(toProps.style)
    } else {
      this.setStyleIfChanged(fromProps, toProps)
    }
  }
}

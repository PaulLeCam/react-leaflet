/* @flow */

import { tileLayer } from 'leaflet'

import BaseTileLayer from './BaseTileLayer'

export default class CanvasTileLayer extends BaseTileLayer {
  componentWillMount () {
    super.componentWillMount()
    this.leafletElement = tileLayer.canvas(this.props)
  }
}

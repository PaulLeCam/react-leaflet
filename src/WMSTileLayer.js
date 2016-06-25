/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import BaseTileLayer from './BaseTileLayer'

export default class WMSTileLayer extends BaseTileLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer.wms(url, props)
  }
}

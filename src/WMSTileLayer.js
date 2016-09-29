/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import GridLayer from './GridLayer'

export default class WMSTileLayer extends GridLayer {
  static propTypes = {
    url: PropTypes.string.isRequired,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer.wms(url, this.getOptions(props))
  }
}

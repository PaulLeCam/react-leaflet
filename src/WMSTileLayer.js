/* @flow */

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import BaseTileLayer from './BaseTileLayer'
import childrenType from './types/children'

export default class WMSTileLayer extends BaseTileLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  };

  componentWillMount () {
    super.componentWillMount()
    const { url, ...props } = this.props
    this.leafletElement = tileLayer.wms(url, props)
  }
}

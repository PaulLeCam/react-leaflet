// @flow

import { tileLayer } from 'leaflet'
import { PropTypes } from 'react'

import childrenType from './types/children'
import GridLayer from './GridLayer'

export default class TileLayer extends GridLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement (props: Object): Object {
    const { url, ...options } = props
    return tileLayer(url, this.getOptions(options))
  }

  updateLeafletElement (fromProps: Object, toProps: Object) {
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
  }
}

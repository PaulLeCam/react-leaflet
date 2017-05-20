// @flow

import { tileLayer } from 'leaflet'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'

import GridLayer from './GridLayer'

export default class TileLayer extends GridLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement(props: Object): Object {
    const { url, ...options } = props
    return tileLayer(url, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    super.updateLeafletElement(fromProps, toProps)
    if (toProps.url !== fromProps.url) {
      this.leafletElement.setUrl(toProps.url)
    }
  }
}

// @flow

import { tileLayer } from 'leaflet'
import { isEqual } from 'lodash'
import PropTypes from 'prop-types'

import childrenType from './propTypes/children'

import GridLayer from './GridLayer'

export default class WMSTileLayer extends GridLayer {
  static propTypes = {
    children: childrenType,
    opacity: PropTypes.number,
    url: PropTypes.string.isRequired,
    zIndex: PropTypes.number,
  }

  createLeafletElement(props: Object): Object {
    const { url, ...options } = props
    return tileLayer.wms(url, this.getOptions(options))
  }

  updateLeafletElement(fromProps: Object, toProps: Object) {
    super.updateLeafletElement(fromProps, toProps)

    const { url: prevUrl, opacity: _po, zIndex: _pz, ...prevParams } = fromProps
    const { url, opacity: _o, zIndex: _z, ...params } = toProps

    if (url !== prevUrl) {
      this.leafletElement.setUrl(url)
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params)
    }
  }
}

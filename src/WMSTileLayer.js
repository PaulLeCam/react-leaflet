/* @flow */

import { tileLayer } from 'leaflet'
import { isEqual } from 'lodash'
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

  componentDidUpdate (prevProps: Object) {
    const { url: prevUrl, ...prevParams } = prevProps
    const { url, ...params } = this.props
    if (url !== prevUrl) {
      this.leafletElement.setUrl(url)
    }
    if (!isEqual(params, prevParams)) {
      this.leafletElement.setParams(params)
    }
  }
}
